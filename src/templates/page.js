import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

import Scrollbar from '../components/scrollbar';
import "../css/components/scrollbar.scss"
import IconClose from "../components/icon_close"
import * as page from '../css/components/page.module.scss'

const Page = ({ data: { node }, location }) => {

  const handleModalClose = () => {
    // Check if it's the first page
    if (location.pathname === '/') {
      navigate('/');
    } else {
      window.history.back();
    }
  };



  const featuredImage = node.featuredImage?.node
  const originalImages = node.featuredImage?.node.localFile.childImageSharp.original
  return (
    <Layout>
      <Seo
        pagetitle={node.title}
        pagedesc={node.excerpt}
        pageimg={originalImages.src}
        imgw={originalImages.width}
        imgh={originalImages.height}
        pagepath={location.pathname}
      />
      <div className="modal">
        <div className="modal-inner">
          <Scrollbar>
            <article
              className={page.page}
            >
              <div className={page.pageCont}>
                <div className={page.pageContLeft}>
                  <h1>{node.title}</h1>
                  {!!node.content && (
                    <section>{parse(node.content)}</section>
                  )}
                </div>
                <div className={page.pageContRight}>
                  {featuredImage && (
                    <GatsbyImage
                      image={featuredImage.gatsbyImage}
                      alt={featuredImage.altText}
                      style={{ height: "100%", marginBottom: 50 }}
                      layout="fullWidth"
                      quality={100}
                      placeholder="dominantColor"
                    />
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

    </Layout >
  )
}

export default Page

export const query = graphql`
  query PageById(
    $id: String!
  ) {
    node: wpPage(id: { eq: $id }) {
      id
      title
      content
      featuredImage {
        node {
          altText
          width
          height
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: DOMINANT_COLOR
            width: 1280
            height: 640
          )
          localFile {
              childImageSharp {
                original {
                  src
                  height
                  width
                }
              }
            }
        }
      }
    }
  }
`