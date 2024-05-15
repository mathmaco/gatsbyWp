const path = require(`path`)
const chunk = require(`lodash/chunk`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })


  const pages = await getPages(gatsbyUtilities)

  // If there are no pages in WordPress, don't do anything
  if (!pages.length) {
    return
  }

  // If there are pages, create pages for them
  await createIndividualPages({ pages, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) => {
      // Create the standard blog post page
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.id,
          isPreview: false,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })

      // Create the preview blog post page
      gatsbyUtilities.actions.createPage({
        path: `/gatsby-source-wordpress/${post.id}`,
        component: path.resolve(`./src/templates/preview-post.js`),
        context: {
          id: post.id,
          isPreview: true,
        },
      })
    })
  )

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

const createIndividualPages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    pages.map(({ node }) => {
      const componentPath = node.uri === '/about/' ?
        './src/templates/about-page.js' :
        './src/templates/page.js';

      return gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: path.resolve(componentPath),
        context: {
          id: node.id,
        },
      })
    })
  )

async function getPages({ graphql, reporter }) {
  const graphqlResultPages = await graphql(/* GraphQL */ `
    query WpPages {
      allWpPage(sort: { fields: [date], order: DESC }) {
        nodes {
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
                }
              }
            }
          }
        }
        edges {
          node {
            id
            uri
            title
            content
          }
        }
      }
    }
  `)

  if (graphqlResultPages.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog pages`,
      graphqlResultPages.errors
    )
    return
  }

  return graphqlResultPages.data.allWpPage.edges
}
