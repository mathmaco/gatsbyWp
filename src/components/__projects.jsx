
import React from "react"
import { Link,graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as p from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
//import { ProjectsContext } from '../contexts/ProjectsContext';
import CustomMarquee from './CustomMarquee'; // Import CustomMarquee


const Projects = () => {
  const { selectedValue } = useSelectedValue();

    const data = useStaticQuery(graphql`
        query {
            allWpPost(sort: { fields: [date], order: DESC }, limit: 1000) {
                nodes {
                    excerpt
                    uri
                    date(formatString: "MMMM DD, YYYY")
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
                            photo {
                                node {
                                    altText
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, layout: CONSTRAINED)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
      <>
            <CustomMarquee>
            <ul data-view={selectedValue} className={p.list}>
                {data.allWpPost.nodes.map((post) => (
                    <li key={post.uri} className={p.listItem}>
                        <article className={p.post} itemScope itemType="http://schema.org/Article">
                            <header className={p.meta}>
                                <div className={p.metaList}>
                                    <div>{post.projects.projectsTitleEn}</div>
                                    <div>{post.projects.projectsSubtitleEn}</div>
                                    <div>
                                        {post.categories.nodes && (
                                            <ul className={p.catList}>
                                                {post.categories.nodes.map((cat, index) => (
                                                    <li key={index}>{cat.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div>
                                        {post.tags.nodes && (
                                            <ul className={p.tagList}>
                                                {post.tags.nodes.map((tags, index) => (
                                                    <li key={index}>{tags.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div>{post.date}</div>
                                </div>
                                <h2>
                                    <Link to={post.uri} itemProp="url">
                                        <span itemProp="headline">{parse(post.title)}</span>
                                    </Link>
                                </h2>
                            </header>
                            <div className={p.gallery}>
                                {post.projects.projectsMedia.map((item, index) => (
                                    <div className={p.item} key={index}>
                                        {item.mediaCheck === 'photo' && item.photo && (
                                            <div className={p.photo}>
                                                <GatsbyImage
                                                    image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                                                    style={{ width: '100%', height: '100%' }}
                                                    alt={item.photo.node.altText} />
                                            </div>
                                        )}
                                        {item.mediaCheck === 'video' && item.video && (
                                            <div className={p.video}>
                                                <iframe
                                                    src={`https://player.vimeo.com/video/${item.video}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&mute=1&autopause=0`}
                                                    width="100%"
                                                    height="100%"
                                                    title="vimeo"
                                                    loading="lazy"
                                                    frameBorder="0"
                                                    allow="autoplay; fullscreen"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </article>
                    </li>
                ))}
          </ul>
</CustomMarquee>
        </>
    );
};

export default Projects;
