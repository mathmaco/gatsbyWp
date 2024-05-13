//layout.jsx
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

//import parse from "html-react-parser"
//import { Helmet } from "react-helmet"






const Layout = ({ isHomePage, children }) => {

  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <>

        <main data-is-root-path={isHomePage}>{children}</main>
      </>
      )
}
export default Layout
