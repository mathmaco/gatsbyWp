import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as p from '../css/components/project.module.scss';
import Marquee from 'react-fast-marquee';

const GalleryMarquee = ({ media, speed }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(media.map((item, index) => (
      <div className={p.item} key={index}>
        {item.photo && (
          <GatsbyImage
            image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
            style={{ height: '100%' }}
            alt=""
          />
        )}
{item.oembed && (
  <>{parse(item.oembed)}</>
)}
      </div>
    )));
  }, [media]);

  const marqueeRef = useRef(null);

  return (
    <>
      <Marquee ref={marqueeRef} speed={speed} direction="left" autoFill={true}>{content}</Marquee>
    </>
  );
};

const Projects = ({ selectedValue }) => {
  const data = useStaticQuery(graphql`
    query {
      allWpPost(
        sort: { fields: [date], order: DESC }
        limit: 1000
        skip: 0
      ) {
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
            projectsGallery {
              nodes {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: DOMINANT_COLOR,)
                  }
                }
              }
            }
            projectsGallerySpeed
            projectsMedia {
              oembed
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

  const allNews = data.allWpPost.nodes;
  const [list, setList] = useState([...allNews.slice(0, 1)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allNews.length > 1);
  const loadRef = useRef();

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore(true);
    }
  }

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, []);

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allNews.length
      const nextResults = isMore
        ? allNews.slice(currentLength, currentLength + 1)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]);

  useEffect(() => {
    const isMore = list.length < allNews.length
    setHasMore(isMore)
  }, [list]);

  return (
    <>
      <ul data-view={selectedValue} className={p.list}>
      {list.map((post, postIndex) => {
        const title = post.title;
        const category = post.categories.nodes;
        const tag = post.tags.nodes;
        //const galleries = post.projects.projectsGallery.nodes;
        const speed = post.projects.projectsGallerySpeed;
        const media = post.projects.projectsMedia;
        //const photo = post.projects.projectsMedia.photo.node;
        //const video = post.projects.projectsMedia.oembed;
        return (
          <li key={post.uri} className={p.listItem}>
            <article className="post-list-item" itemScope itemType="http://schema.org/Article">
              <header>
                {category.map((cat, index) => (
                  <ul key={index}>
                    <li>{cat.name}</li>
                  </ul>
                ))}
                {tag.map((tags, index) => (
                  <ul key={index}>
                    <li>{tags.name}</li>
                  </ul>
                ))}
                <h2 style={{ fontSize: '18px', fontWeight: '600', textAlign: 'left' }}>
                  <Link to={post.uri} itemProp="url">
                    <span itemProp="headline">{parse(title)}</span>
                  </Link>
                </h2>
                <small>{post.date}</small>
              </header>
              <div className={p.gallery}>
                {media && (<GalleryMarquee media={media} speed={speed} />
                )}
              </div>
              <section itemProp="description">{parse(post.excerpt)}</section>
            </article>
          </li>
        );
      })}
      </ul>
      <div ref={loadRef}>
        {hasMore ? <p>Loading...</p> : <p>No more results</p>}
      </div>
    </>
  );
};

export default Projects;
