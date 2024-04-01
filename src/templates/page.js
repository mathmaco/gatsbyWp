import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

const Page = ({ data: { node }, location }) => {

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
      <article className="myContainer">
        <h1>{node.title}</h1>
        {!!node.content && (
          <section>{parse(node.content)}</section>
        )}

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



      </article>

    </Layout>
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