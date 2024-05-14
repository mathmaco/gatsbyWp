import React, { useState, useEffect } from "react"
import { Link, graphql, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from 'html-react-parser'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Scrollbar from '../components/scrollbar'
import IconClose from "../components/icon_close"
import * as single from '../css/components/project-single.module.scss'
import Star from "../components/star";
import IconArrow from "../components/icon_arrow";

const PreviewTemplate = ({ data, location }) => {
 const [post, setPost] = useState(data.post);

 useEffect(() => {
  setPost(data.post);
 }, [data.post]);


 const handleModalClose = () => {
  // Check if it's the first page
  if (location.pathname === '/') {
   navigate('/');
  } else {
   window.history.back();
  }
 };
 //const featuredImage = post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
 const category = post.categories.nodes
 const tag = post.tags.nodes
 //const speed = post.projects.projectsGallerySpeed
 //const mediaCheck = post.projects.projectsMedia.mediaCheck
 const media = post.projects.projectsMedia
 const credit = post.projects.projectsCredit
 const count = post.projects.projectsMediaCount
 const power = post.projects.projectsMediaPower
 //const subTtlEn = post.projects.projectsSubtitleEn
 const subTtlJa = post.projects.projectsSubtitleJa
 //const ttlEn = post.projects.projectsTitleEn
 const url = post.projects.projectsUrl

 const fillColor = "#000";

 const options = {
  replace: ({ attribs, children, name }) => {
   if (!attribs) {
    return;
   }

   if (name === 'br') {
    return <br />;
   }
  }
 };


 return (
  <Layout location={location}>
   <Seo
    pagetitle={post.title}
    pagedesc={post.excerpt}
   />
   <div className="modal">
    <div className="modal-inner">
     <Scrollbar>
      <article
       className={single.post}
       itemScope
       itemType="http://schema.org/Article"
      >
       <div className={single.postCont}>
        <div className={single.postContLeft}>
         <div className={single.mediaList}>
          <ul>
           {media.map((item, index) => (
            <li key={index}>
             {item.mediaCheck === 'photo' && item.photo && (
              <div className={single.photo}>
               <GatsbyImage
                image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                style={{ width: '100%' }}
                alt={item.altText || "画像名"}
               />
              </div>
             )}
             {item.mediaCheck === 'video' && item.video && (
              <div className={single.video} style={{ paddingTop: item.aspect + '%' }}>
               <iframe
                src={`https://player.vimeo.com/video/${item.video}?autoplay=0&loop=0&title=0&byline=0&portrait=0&controls=1&muted=0&autopause=0`}
                frameBorder="0"
                title="vimeo"
                loading="lazy"
               />
              </div>
             )}
            </li>
           ))}
          </ul>
         </div>
        </div>
        <div className={single.postContRight}>
         <header className={single.header}>
          <div className={single.TtlCont}>
           <h1 itemProp="headline" className={single.ttlja}>{parse(post.title)}</h1>
           <div className={single.subttlja}>{subTtlJa}</div>
          </div>
          <div className={single.meta}>
           <div className={single.metaBox}>
            <div className={single.metaBoxLeft}>
             {category && (
              <ul className={single.categoryList}>
               {category.map((cat, index) => (
                <li key={index}>{cat.name}</li>
               ))}
              </ul>
             )}
             {tag && (
              <ul className={single.tagList}>
               {tag.map((tags, index) => (
                <li key={index}>{tags.name}</li>
               ))}
              </ul>
             )}
             <div className={single.date}>{post.date}</div>
            </div>
            <div className={single.metaBoxRight}>
             <div className={single.power}>P{power}</div>
             <div className={single.count}>[{count}]</div>
             <div className={single.star}><i className="icon-star"><Star fill={fillColor} w={10} h={10} /></i></div>
            </div>
           </div>
          </div>

          {/*{featuredImage && (
                      <GatsbyImage
                        image={featuredImage}
                        alt={post.featuredImage.node.altText}
                        style={{ marginBottom: 50 }}
                      />
                    )}*/}
         </header>


         {!!post.content && (
          <section itemProp="articleBody" className={single.textarea}>
           {parse(post.content, options)}
          </section>
         )}

         {!!credit && (
          <footer className={single.footer}>
           <div className={single.credit}>{parse(credit)}</div>
           <div className={single.url}><a href={url} target="_blank" rel="noreferrer">{url}<i className={single.linkArrow}><IconArrow fill={fillColor} /></i></a></div>
          </footer>
         )}

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

export default PreviewTemplate

export const pageQuery = graphql`
  query PreviewPostById(
    $id: String!
  ) {
    post: wpPost(id: {eq: $id}) {
      id
      excerpt
      content
      title
      categories {
        nodes {
          name
          slug
          id
        }
      }
      tags {
        nodes {
          name
          id
          slug
        }
      }
      projects {
        projectsGallerySpeed
        projectsCredit
        projectsMediaCount
        projectsMediaPower
        projectsSubtitleEn
        projectsSubtitleJa
        projectsTitleEn
        projectsUrl
        projectsMedia {
          mediaCheck
          video
          aspect
          photo {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
      date(formatString: "MMMM YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
  }
`
