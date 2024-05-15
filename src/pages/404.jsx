import React, { useContext } from "react"
import { graphql, Link, navigate } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { TimeContext } from '../contexts/TimeContext';
import Logo from "../components/logo";
import Star from "../components/star";


import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

import Scrollbar from '../components/scrollbar';
import "../css/components/scrollbar.scss"
import IconClose from "../components/icon_close"
import * as page from '../css/components/page.module.scss'

import "../css/components/about.scss"

const NotFoundPage = ({data, location }) => {




  //const siteTitle = data.site.siteMetadata.title

  const fillColor = "#000";
  const currentTime = useContext(TimeContext);


  const handleModalClose = () => {
    // Check if it's the first page
    if (location.pathname === '/') {
      navigate('/');
    } else {
      window.history.back();
    }
  };



  return (
    <Layout location={location} >
      <Seo
        pagetitle="ページが見つかりませんでした"
        pagepath={location.pathname}
      />

      <div className={`modal about-page`}>
        <div className="modal-inner">
          <Scrollbar>
            <article
              className={`${page.page}`}
            >
              <div className={page.pageCont}>
                  <div className="about-content-left">
                    <div className="inner">
                      <div className="about-box">
                        <ul className="sns-list">
                          <li><a href="" target="_blank">Instagram</a></li>
                          <li><a href="" target="_blank">Vimeo</a></li>
                          <li><a href="" target="_blank">X</a></li>
                        </ul>
                        <div className="about-time">
                          <div className="current-time">{currentTime}<i className="icon-star"><Star fill={fillColor} w={10} h={10} /></i></div>
                        </div>
                        <div className="about-info">
                          <div className="about-logo"><Logo /></div>
                          <div className="about-creative">
                            <ul className="creative-list">
                              <li><span>graphic/</span></li>
                              <li><span>film/</span></li>
                              <li><span>motion/</span></li>
                              <li><span>digital/</span></li>
                              <li><span>sound</span></li>
                            </ul>
                            <h2 className="creative-main">Designer</h2>
                          </div>
                          <div className="about-mail">
                            <div className="mail-title">mail</div>
                            <div className="mail-address">paa(at)paa.ac</div>
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                <div className="about-content-right">
                  <div className="inner">
                    <div className={page.pageContBox}>
                  <div className="404-content">
                    <h1>404: Not Found</h1>
                    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
                  </div>
                  <div className={page.pageThumb}></div>
                    </div>
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
              <Link to="/" className="modal-close">
                <IconClose />
              </Link>
            )
          }

        </div>
      </div>


    </Layout>

  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
