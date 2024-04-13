import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

import { Helmet } from "react-helmet"



import Footer from "./footer";
import Header from "./header";
import Projects from "./projects";




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
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@4.0.1/dist/css/yakuhanjp.css" />
        <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=z~SmMymcE-s%3D&aa=1&ab=2"></script>
        <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&pm=1&aa=1&ab=2"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </Helmet>
      <Header />

        <div className="global-wrapper" data-is-root-path={isHomePage}>
          <header className="global-header">
            {/*{isHomePage ? (
              <h1 className="main-heading">
                <Link to="/">{parse(title)}</Link>
              </h1>
            ) : (
              <Link className="header-link-home" to="/">
                {title}
              </Link>
            )}*/}
          </header>

        <main>
          <Projects />
          {children}</main>

          <Footer />
        </div>
      </>
      )
}

      export default Layout
