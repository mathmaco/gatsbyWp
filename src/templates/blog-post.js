import React, { useEffect } from "react"
import { Link, graphql, navigate } from "gatsby"

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

import Layout from "../components/layout"
import Seo from "../components/seo"

import Scrollbar from '../components/scrollbar';
import "../css/components/scrollbar.scss"
import IconClose from "../components/icon_close"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const handleModalClose = () => {
    // Check if it's the first page
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      navigate('/');
    } else {
      window.history.back();
    }
  };

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const category = post.categories.nodes;
  const tag = post.tags.nodes;
  //const galleries = post.projects.projectsGallery.nodes;
  const speed = post.projects.projectsGallerySpeed;
  const media = post.projects.projectsMedia;


  const credit = post.projects.projectsCredit
  const count = post.projects.projectsMediaCount
  const power = post.projects.projectsMediaPower
  const subTtlEn = post.projects.projectsSubtitleEn
  const subTtlJa = post.projects.projectsSubtitleJa
  const ttlEn = post.projects.projectsTitleEn
  const url = post.projects.projectsUrl

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <div className="modal">
        <div className="modal-inner">
          <Scrollbar>
            <div className="modal-cont">
              <article
                className={projectSingle.post}
                itemScope
                itemType="http://schema.org/Article"
              >
                <div className={projectSingle.postCont}>
                  <div className={projectSingle.postContLeft}>
                    <div className={projectSingle.item}>
                      <ul>{media.map((item, index) => (
                        <li key={index}>
                          {item.photo && (
                            <GatsbyImage
                              image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                              style={{ width: '100%', height: '100%' }}
                              alt={item.altText}
                            />
                          )}
                          {item.videoid && (
                            <div className={projectSingle.video}>
                              <iframe
                                src={`https://player.vimeo.com/video/${item.videoid}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&mute=1&autopause=0`}
                                width={'100%'}
                                height={'100%'}
                                frameBorder={'0'}
                                title='vimeo'
                                loading="lazy"
                              />
                            </div>
                          )}
                        </li>
                      ))}
                      </ul>
                    </div>
                  </div>
                  <div className={projectSingle.postContRight}>
                    <header>
                      <h1 itemProp="headline">{parse(post.title)}</h1>
                      <div className={projectSingle.subTtlJa}>{subTtlJa}</div>
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
                    </footer>
                  </div>
                </div>
              </article>
            </div>
          </Scrollbar>
          {window.location.pathname === '/' ? (

            <div
              role="button"
              tabIndex={0}
              className="modal-close"
              onClick={handleModalClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleModalClose();
                }
              }}
              aria-label="Close modal"
            >
              <IconClose />
            </div>

          ) : (
            <Link to="/">
              <div>
                <IconClose />
              </div>
            </Link>
          )}

        </div>
      </div>
    </Layout >
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
        query BlogPostById(
        $id: String!
        $previousPostId: String
        $nextPostId: String
        ) {
          post: wpPost(id: {eq: $id }) {
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
        previous: wpPost(id: {eq: $previousPostId }) {
          uri
      title
    }
        next: wpPost(id: {eq: $nextPostId }) {
          uri
      title
    }
  }
        `
