import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse, { domToReact } from 'html-react-parser'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Scrollbar from '../components/scrollbar'
import IconClose from "../components/icon_close"
import * as single from '../css/components/project-single.module.scss'
import Star from "../components/star";


const BlogPostTemplate = ({ data: { previous, next, post }, location }) => {
  const handleModalClose = () => {
    // Check if it's the first page
    if (location.pathname === '/') {
      navigate('/');
    } else {
      window.history.back();
    }
  };
  const featuredImage = post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  const category = post.categories.nodes
  const tag = post.tags.nodes
  //const speed = post.projects.projectsGallerySpeed
  const media = post.projects.projectsMedia
  //const video = post.projects.projectsMedia.videoid
  const credit = post.projects.projectsCredit
  const count = post.projects.projectsMediaCount
  const power = post.projects.projectsMediaPower
  //const subTtlEn = post.projects.projectsSubtitleEn
  const subTtlJa = post.projects.projectsSubtitleJa
  //const ttlEn = post.projects.projectsTitleEn
  const url = post.projects.projectsUrl

  const fillColor = "#000";

  const options = {
    replace: ({ attribs, children, name }) => {
      if (!attribs) {
        return;
      }

      if (name === 'br') {
        return <br />;
      }
    }
  };


  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      <div className="modal">
        <div className="modal-inner">
          <Scrollbar>
            <article
              className={single.post}
              itemScope
              itemType="http://schema.org/Article"
            >
              <div className={single.postCont}>
                <div className={single.postContLeft}>
                  <div>
                    <ul className="">
                      {media.map((item, index) => (
                        <li key={index}>
                          {item.photo && (
                            <GatsbyImage
                              image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                              style={{ width: '100%', height: '100%' }}
                              alt={item.altText}
                            />
                          )}
                          {item.videoid && (
                            <div>
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
                <div className={single.postContRight}>
                  <header className={single.header}>
                    <div className={single.TtlCont}>
                      <h1 itemProp="headline" className={single.ttlja}>{parse(post.title)}</h1>
                      <div className={single.subttlja}>{subTtlJa}</div>
                    </div>
                    <div className={single.meta}>
                      <div className={single.metaBox}>
                        <div className={single.metaBoxLeft}>
                          {category && (
                            <ul className={single.categoryList}>
                              {category.map((cat, index) => (
                                <li key={index}>{cat.name}</li>
                              ))}
                            </ul>
                          )}
                          {tag && (
                            <ul className={single.tagList}>
                              {tag.map((tags, index) => (
                                <li key={index}>{tags.name}</li>
                              ))}
                            </ul>
                          )}
                          <div className={single.date}>{post.date}</div>
                        </div>
                        <div className={single.metaBoxRight}>
                          <div className={single.power}>P{power}</div>
                          <div className={single.count}>[{count}]</div>
                          <div className={single.star}><i className="icon-star"><Star fill={fillColor} /></i></div>
                        </div>
                      </div>
                    </div>

                    {/*{featuredImage && (
                      <GatsbyImage
                        image={featuredImage}
                        alt={post.featuredImage.node.altText}
                        style={{ marginBottom: 50 }}
                      />
                    )}*/}
                  </header>


                  {!!post.content && (
                    <section itemProp="articleBody" className={single.textarea}>
                      {parse(post.content, options)}
                    </section>
                  )}

                  {!!credit && (
                    <footer className={single.footer}>
                      <div className={single.credit}>{parse(credit)}</div>
                      <div className={single.url}><a href="{url}" target="_blank">{url}</a></div>
                    </footer>
                  )}

                </div>
              </div>
            </article>
          </Scrollbar>
          {
            location.pathname === '/' ? (
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
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
  ) {
    post: wpPost(id: {eq: $id}) {
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
      date(formatString: "MMMM YYYY")
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
  }
`
