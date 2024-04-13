import React, { useContext } from "react"
import { graphql, Link, navigate } from "gatsby"

import { TimeContext } from '../contexts/TimeContext';

import Layout from "../components/layout"
import Seo from "../components/seo"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

import Scrollbar from '../components/scrollbar';
import "../css/components/scrollbar.scss"
import IconClose from "../components/icon_close"
import * as page from '../css/components/page.module.scss'

import "../css/components/about.scss"

const Page = ({ data: { node }, location }) => {

  const currentTime = useContext(TimeContext);

  const handleModalClose = () => {
    // Check if it's the first page
    if (location.pathname === '/') {
      navigate('/');
    } else {
      window.history.back();
    }
  };

  const safeClassName = node.slug.replace(/\s+/g, '-').toLowerCase();
  const pageName = node.slug;
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
      <div className={`modal ${safeClassName}-page`}>
        <div className="modal-inner">
          <Scrollbar>
            <article
              className={`${page.page}`}
            >
              <div className={page.pageCont}>
                <div className={page.pageContLeft}>
                  <div className="about-content-left">
                    <ul className="snsList">
                      <li><a href="" target="_blank">Instagram</a></li>
                      <li><a href="" target="_blank">Vimeo</a></li>
                      <li><a href="" target="_blank">X</a></li>
                    </ul>
                    <h1>{node.title}</h1>
                    現在の日本時間: {currentTime}
                  </div>
                </div>
                <div className={page.pageContRight}>
                  <div className="about-content-right">
                    <div className="about-textarea">
                      {!!node.content && (
                        <div>{parse(node.content)}</div>
                      )}
                    </div>
                    {/*{featuredImage && (
                    <GatsbyImage
                      image={featuredImage.gatsbyImage}
                      alt={featuredImage.altText}
                      style={{ height: "100%", marginBottom: 50 }}
                      layout="fullWidth"
                      quality={100}
                      placeholder="dominantColor"
                    />
                  )}*/}
                  </div>
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
      slug
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