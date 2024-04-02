import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  //const siteDescription = data.site.siteMetadata.description
 return (
  <>

     <Layout location={location} title={siteTitle}>
       <Seo title="INDEXPAGE" description="TOPページです" />
        <h1>INDEX: PAGE</h1>
     </Layout>
  </>
 )
}

export default IndexPage




export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: 3
      skip: 0
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        #featuredImage {
        #  node {
        #    localFile {
        #      childImageSharp {
        #        gatsbyImageData(quality: 100,layout: FULL_WIDTH,placeholder: DOMINANT_COLOR)
        #      }
        #    }
        #    altText
        #  }
        #}
      }
    }
  }
`