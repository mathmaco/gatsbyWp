import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"
import * as projectSingle from '../css/components/project-single.module.scss';
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <div className="modal">
        <article
          className={projectSingle.post}
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className={projectSingle.postCont}>
            <div className={projectSingle.postContLeft}>
              aaaaaaaaaaa
            </div>
            <div className={projectSingle.postContLeft}>
              <header>
                <h1 itemProp="headline">{parse(post.title)}</h1>

                <p>{post.date}</p>

                {/* if we have a featured image for this post let's display it */}
                {featuredImage?.data && (
                  <GatsbyImage
                    image={featuredImage.data}
                    alt={featuredImage.alt}
                    style={{ marginBottom: 50 }}
                  />
                )}
              </header>

              {!!post.content && (
                <section itemProp="articleBody">{parse(post.content)}</section>
              )}

              <hr />

              <footer>
                <Bio />
              </footer>
            </div>
          </div>
        </article>
      </div>

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      categories {
            nodes {
              name
              slug
              id
            }
          }
          tags {
            nodes {
              name
              id
              slug
            }
          }
          projects {
            projectsGallerySpeed
            projectsCredit
            projectsMediaCount
            projectsMediaPower
            projectsSubtitleEn
            projectsSubtitleJa
            projectsTitleEn
            projectsUrl
            projectsMedia {
              videoid
              photo {
                node {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, layout: CONSTRAINED)
                    }
                  }
                }
              }
            }
          }
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
