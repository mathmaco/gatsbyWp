import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as p from '../css/components/project.module.scss';
import Marquee from 'react-fast-marquee';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import { ProjectsContext } from '../contexts/ProjectsContext';

const GalleryMarquee = ({ media, speed, postIndex }) => {
  return (
    <Marquee speed={speed} direction={postIndex % 2 === 0 ? 'left' : 'right'} autoFill={true}>
      {media.map((item, index) => (
        <div className={p.item} key={index}>
          {item.mediaCheck === 'photo' && item.photo && (
            <div className={p.photo}>
              <GatsbyImage
                image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                alt=""
                style={{ width: '100%', height: '100%' }}
              />
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
              />
            </div>
          )}
        </div>
      ))}
    </Marquee>
  );
};

const ItemList = ({ items, className, renderItem }) => (
  <ul className={className}>
    {items.map((item, index) => (
      <li key={index}>{renderItem(item)}</li>
    ))}
  </ul>
);

const Projects = () => {
  const projectsContext = useContext(ProjectsContext);
  const { selectedValue } = useSelectedValue();
  const [list, setList] = useState([]);
  const loadRef = useRef();

  useEffect(() => {
    setList(projectsContext.slice(0, 1));
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setList(current => current.concat(projectsContext.slice(current.length, current.length + 3))),
      { rootMargin: '0px', threshold: 1 }
    );
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }
    return () => observer.disconnect();
  }, [projectsContext]);

  return (
    <>
      <ul data-view={selectedValue} className={p.list}>
        {list.map((post, postIndex) => (
          <li key={post.uri} className={p.listItem}>
            <article className={p.post} itemScope itemType="http://schema.org/Article">
              <header className={p.meta}>
                <div className={p.metaList}>
                  <div>{post.projects.projectsTitleEn}</div>
                  <div>{post.projects.projectsSubtitleEn}</div>
                  <ItemList items={post.categories.nodes} className={p.catList} renderItem={cat => cat.name} />
                  <ItemList items={post.tags.nodes} className={p.tagList} renderItem={tag => tag.name} />
                  <div>{post.date}</div>
                </div>
                <h2>
                  <Link to={post.uri} itemProp="url">
                    <span itemProp="headline">{parse(post.title)}</span>
                  </Link>
                </h2>
              </header>
              <div className={p.gallery}>
                <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} postIndex={postIndex + 1} />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div ref={loadRef}>
        {list.length < projectsContext.length ? <p>Loading...</p> : <p>No more results</p>}
      </div>
    </>
  );
};

export default Projects;
