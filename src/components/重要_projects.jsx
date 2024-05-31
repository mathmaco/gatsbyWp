import React, { useContext, useMemo, useRef } from "react";
import { Link } from 'gatsby';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


import parse from 'html-react-parser';
import * as projectStyles from '../css/components/project.module.scss';
import { ProjectsContext } from '../contexts/ProjectsContext';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import Star from "./star";
import GalleryMarquee from './GalleryMarquee'; // GalleryMarqueeコンポーネントをインポート

const fillColor = '#c9171e';

const Projects = () => {
  const { selectedValue } = useSelectedValue();
  const posts = useContext(ProjectsContext);
  const workerRef = useRef(null);

  const renderedPosts = useMemo(() => (
    posts.map((post, postIndex) => (
      <li id={`js-pixel` + postIndex} key={post.uri} className={projectStyles.listItem}>
        <article className={projectStyles.post} itemScope itemType="http://schema.org/Article">
          <Link to={post.uri} itemProp="url" className={`${projectStyles.link} play-sound`}>
            <header className={projectStyles.meta}>
              <div className={`${projectStyles.metaList} ${projectStyles.layout1}`}>
                <div className={projectStyles.metaItem}><div className={projectStyles.metaItemChild}><h3 className={projectStyles.titleEn}>{post.projects.projectsTitleEn}</h3></div></div>
                <div className={projectStyles.metaItem}><div className={projectStyles.metaItemChild}><div className={projectStyles.subTitleEn}>{post.projects.projectsSubtitleEn}</div></div></div>
                <div className={projectStyles.metaItem}>
                  {post.categories.nodes && (
                    <ul className={projectStyles.catList}>
                      {post.categories.nodes.map((cat, index) => (
                        <li key={index}>{cat.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={projectStyles.metaItem}>
                  {post.tags.nodes && (
                    <ul className={projectStyles.tagList}>
                      {post.tags.nodes.map((tags, index) => (
                        <li key={index}>{tags.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={projectStyles.metaItem}><div className={projectStyles.date}>{post.date}</div></div>
              </div>
              <div className={`${projectStyles.metaList} ${projectStyles.layout2}`}>
                <div className={projectStyles.metaListHeader}>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}><h2 className={projectStyles.titleJa}>{parse(post.title)}</h2></div>
                    <div className={projectStyles.metaItemChild}><div className={projectStyles.subTitleJa}>{post.projects.projectsSubtitleJa}</div></div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      {post.categories.nodes && (
                        <ul className={projectStyles.catList}>
                          {post.categories.nodes.map((cat, index) => (
                            <li key={index}>{cat.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}><div className={projectStyles.date}>{post.date}</div></div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}></div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}><Star fill={fillColor} w={15} h={15} /></div>
                  </div>
                </div>
                <div className={projectStyles.metaListFooter}>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}><h3 className={projectStyles.titleEn}>{post.projects.projectsTitleEn}</h3></div>
                    <div className={projectStyles.metaItemChild}><div className={projectStyles.subTitleEn}>{post.projects.projectsSubtitleEn}</div></div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      {post.tags.nodes && (
                        <ul className={projectStyles.tagList}>
                          {post.tags.nodes.map((tags, index) => (
                            <li key={index}>{tags.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      {post.projects.projectsMediaCount && (
                        <div className={projectStyles.count}>[{post.projects.projectsMediaCount}]</div>
                      )}
                    </div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}></div>
                  </div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      {post.projects.projectsMediaPower && (
                        <div className={projectStyles.power}>P{post.projects.projectsMediaPower}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className={`${projectStyles.gallery}`}>
              <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} postIndex={postIndex + 1} />
            </div>
          </Link>
        </article>
      </li>
    ))
  ), [posts]);

  return (
    <>
      <div id="projects" className="projects">
        <ul data-view={selectedValue} className={projectStyles.list}>
          {renderedPosts}
        </ul>
      </div>
      <footer></footer>
    </>
  );
};

export default Projects;
