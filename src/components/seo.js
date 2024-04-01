/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
//import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

export default props => {
  const data = useStaticQuery(graphql`
   query {
    site {
      siteMetadata {
      lang
      title
      description
      siteUrl
      locale
      fbappid
      }
    }
   }
  `)

  const title = props.pagetitle
    ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title
  const description = props.pagedesc || data.site.siteMetadata.description

  const url = props.pagepath
    ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
    : data.site.siteMetadata.siteUrl

  const imgurl = props.pageimg
    ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
    : props.blogimg || `${data.site.siteMetadata.siteUrl}/ogp.jpg`
  const imgw = props.pageimgw || 1280
  const imgh = props.pageimgh || 640


  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="fb:app_id" content={data.site.siteMetadata.fbappid} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />

      <meta name="twitter:site" content={data.site.siteMetadata.title} />
      <meta name="twitter:title " content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="" />

      <meta name="twitter:image" content={imgurl} />
      <meta name="twitter:card" content="summary_large_image" />

    </Helmet>
  )
}

//const Seo = ({ description, lang, meta, title }) => {
//  const { wp, wpUser } = useStaticQuery(
//    graphql`
//      query {
//        wp {
//          generalSettings {
//            title
//            description
//          }
//        }
//
//        # if there's more than one user this would need to be filtered to the main user
//        wpUser {
//          twitter: name
//        }
//      }
//    `
//  )
//
//  const metaDescription = description || wp.generalSettings?.description
//  const defaultTitle = wp.generalSettings?.title
//
//  return (
//    <Helmet
//      htmlAttributes={{
//        lang,
//      }}
//      title={title}
//      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
//      meta={[
//        {
//          name: `description`,
//          content: metaDescription,
//        },
//        {
//          property: `og:title`,
//          content: title,
//        },
//        {
//          property: `og:description`,
//          content: metaDescription,
//        },
//        {
//          property: `og:type`,
//          content: `website`,
//        },
//        {
//          name: `twitter:card`,
//          content: `summary`,
//        },
//        {
//          name: `twitter:creator`,
//          content: wpUser?.twitter || ``,
//        },
//        {
//          name: `twitter:title`,
//          content: title,
//        },
//        {
//          name: `twitter:description`,
//          content: metaDescription,
//        },
//      ].concat(meta)}
//    />
//  )
//}
//
//Seo.defaultProps = {
//  lang: `ja`,
//  meta: [],
//  description: ``,
//}
//
//Seo.propTypes = {
//  description: PropTypes.string,
//  lang: PropTypes.string,
//  meta: PropTypes.arrayOf(PropTypes.object),
//  title: PropTypes.string.isRequired,
//}
//
//export default Seo
