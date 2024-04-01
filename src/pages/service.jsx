import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"



const ServicePage = ({ data, location }) => {
 return (
  <>
     <Layout>
       <Seo
         pagetitle="さーびす"
         pagedesc="Paa service"
         pagepath={location.pathname}
       />


       <h1>SERVICE : PAGE</h1>
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

export default ServicePage





export const pageQuery = graphql`
  query {
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
       gatsbyImageData(quality: 100,layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
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