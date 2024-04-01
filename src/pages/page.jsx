import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"



const samplePage = ({ data, location }) => {
 return (
  <>
     <Layout>
       <Seo
         pagetitle="静的ぺーじ"
         pagedesc="静的ぺーじ説明"
         pagepath={location.pathname}
       />


       <h1>静的ぺーじ : PAGE</h1>
       <figure className="hero">
         <GatsbyImage
          image={data.hero.childImageSharp.gatsbyImageData}
          alt=""
          style={{ height: "100%" }}
         />
       </figure>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
   </Layout>
  </>
 )
}

export default samplePage





export const pageQuery = graphql`
  query {
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
    wpPage {
    title
  }
  }
`