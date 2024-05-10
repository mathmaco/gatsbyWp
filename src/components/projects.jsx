import React, { useContext, useMemo } from "react";
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as project from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import Marquee from 'react-fast-marquee';
import Star from "./star";
 const fillColor = '#c9171e';
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
          <Link to={post.uri} itemProp="url" className={project.link}>
          <header className={project.meta}>
            <div className={`${project.metaList} ${project.layout1}`}>
              <div className={project.metaItem}><div className={project.metaItemChild}><h3 className={project.titleEn}>{post.projects.projectsTitleEn}</h3></div></div>
              <div className={project.metaItem}><div className={project.metaItemChild}><div className={project.subTitleEn}>{post.projects.projectsSubtitleEn}</div></div></div>
                <div className={project.metaItem}>
                  <div className={project.metaItemChild}>
                {post.categories.nodes && (
                  <ul className={project.catList}>
                    {post.categories.nodes.map((cat, index) => (
                      <li key={index}>{cat.name}</li>
                    ))}
                  </ul>
                    )}
                    </div>
              </div>
                <div className={project.metaItem}>
                  <div className={project.metaItemChild}>
                {post.tags.nodes && (
                  <ul className={project.tagList}>
                    {post.tags.nodes.map((tags, index) => (
                      <li key={index}>{tags.name}</li>
                    ))}
                  </ul>
                    )}
                    </div>
              </div>
              <div className={project.metaItem}><div className={project.metaItemChild}><div className={project.date}>{post.date}</div></div></div>
              </div>
              <div className={`${project.metaList} ${project.layout2}`}>
                <div className={project.metaListHeader}>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><h2 className={project.titleJa}>{parse(post.title)}</h2></div>
                    <div className={project.metaItemChild}><div className={project.subTitleJa}>{post.projects.projectsSubtitleJa}</div></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}>
                      {post.categories.nodes && (
                      <ul className={project.catList}>
                        {post.categories.nodes.map((cat, index) => (
                          <li key={index}>{cat.name}</li>
                        ))}
                      </ul>
                      )}
                    </div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><div className={project.date}>{post.date}</div></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><Star fill={fillColor} w={15} h={15} /></div>
                  </div>
                </div>
                <div className={project.metaListFooter}>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><h3 className={project.titleEn}>{post.projects.projectsTitleEn}</h3></div>
                    <div className={project.metaItemChild}><div className={project.subTitleEn}>{post.projects.projectsSubtitleEn}</div></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}>
                      {post.tags.nodes && (
                      <ul className={project.tagList}>
                        {post.tags.nodes.map((tags, index) => (
                          <li key={index}>{tags.name}</li>
                        ))}
                      </ul>
                    )}
                    </div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><div className={project.count}>[{post.projects.projectsMediaCount}]</div></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}></div>
                  </div>
                  <div className={project.metaItem}>
                    <div className={project.metaItemChild}><div className={project.power}>P{post.projects.projectsMediaPower}</div></div>
                  </div>
                </div>

              <div>

              </div>

            </div>
          </header>
          <div className={project.gallery}>
            <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} postIndex={postIndex + 1} />
          </div>
            </Link>
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
