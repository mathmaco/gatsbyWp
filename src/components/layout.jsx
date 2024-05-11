//layout.jsx
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
        <div className="global-wrapper" data-is-root-path={isHomePage}>
        <main>{children}</main>
        </div>
      </>
      )
}
export default Layout
