import React, { useContext, useMemo } from "react";
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as project from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import Marquee from 'react-fast-marquee';

const GalleryMarquee = ({ media, speed, postIndex }) => {
  return (
    <Marquee speed={speed} direction={postIndex % 2 === 0 ? 'left' : 'right'} autoFill={true}>
      {media.map((item, index) => (
        <div className={project.item} key={index}>
          {item.mediaCheck === 'photo' && item.photo && (
            <div className={project.photo}>
              <GatsbyImage
                image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                style={{ width: '100%', height: '100%' }}
                alt={item.photo.node.altText || 'デフォルトのサイト名'} />
            </div>
          )}
          {item.mediaCheck === 'video' && item.video && (
            <div className={project.video}>
              <iframe
                src={`https://player.vimeo.com/video/${item.video}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&mute=1&autopause=0`}
                width="100%"
                height="100%"
                title="vimeo"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; fullscreen"
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </Marquee>
  );
};

const Projects = () => {
  const { selectedValue } = useSelectedValue();
  const posts = useContext(ProjectsContext);
  const renderedPosts = useMemo(() => (
    posts.map((post, postIndex) => (
        <li key={post.uri} className={project.listItem}>
        <article className={project.post} itemScope itemType="http://schema.org/Article">
          <header className={project.meta}>
            <div className={project.metaList}>
              <div>{post.projects.projectsTitleEn}</div>
              <div>{post.projects.projectsSubtitleEn}</div>
              <div>
                {post.categories.nodes && (
                  <ul className={project.catList}>
                    {post.categories.nodes.map((cat, index) => (
                      <li key={index}>{cat.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                {post.tags.nodes && (
                  <ul className={project.tagList}>
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
          <div className={project.gallery}>
            <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} postIndex={postIndex + 1} />
          </div>
        </article>
      </li>
    ))
  ), [posts]);

  return (
    <section className="projects">
    <ul data-view={selectedValue} className={project.list}>
      {renderedPosts}
      </ul>
      </section>
  );
};

export default Projects;
