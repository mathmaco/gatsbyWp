import React, { useContext, useMemo, useEffect, useRef, useState, useCallback } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { getVimeoThumbnail } from './utils/getVimeoThumbnail'; // Vimeoサムネイルを取得する関数
import parse from 'html-react-parser';
import * as projectStyles from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import { pixelateImage } from './utils/pixelateImage';
import Marquee from 'react-fast-marquee';
import Star from "./star";


gsap.registerPlugin(ScrollTrigger);

const fillColor = '#c9171e';
const GalleryMarquee = React.memo(({ media, speed, postIndex }) => {
  const [pixelatedImages, setPixelatedImages] = useState([]);

  useEffect(() => {
    const pixelateMedia = async () => {
      const pixelated = await Promise.all(media.map(async (item) => {
        if (item.mediaCheck === 'photo' && item.photo) {
          const gatsbyImageData = getImage(item.photo.node.localFile.childImageSharp.gatsbyImageData);
          const originalSrc = gatsbyImageData.images.fallback.src;
          return new Promise((resolve) => {
            pixelateImage(originalSrc, 150, (pixelatedSrc) => {
              resolve({
                ...item,
                photo: {
                  ...item.photo,
                  pixelatedSrc,
                },
              });
            });
          });
        } else if (item.mediaCheck === 'video' && item.video) {
          const thumbnailUrl = await getVimeoThumbnail(item.video);
          return new Promise((resolve) => {
            pixelateImage(thumbnailUrl, 150, (pixelatedSrc) => {
              resolve({
                ...item,
                video: {
                  ...item.video,
                  pixelatedSrc,
                },
              });
            });
          });
        }
        return item;
      }));
      setPixelatedImages(pixelated);
    };

    pixelateMedia();
  }, [media]);

  useEffect(() => {
    if (pixelatedImages.length > 0) {
      const boundElms = document.querySelectorAll(".js-pixel");

      boundElms.forEach((element, index) => {
        const mediaPixels = element.querySelectorAll('.media-pixel');

        gsap.fromTo(
          mediaPixels,
          { zIndex: 2 },
          {
            zIndex: -2,
            stagger: 0.05,
            duration: 0.01,
            scrollTrigger: {
              trigger: element, // 各 .js-pixel 要素をトリガーとして設定
              start: "top 50%",
              end: "top 90%",
              scrub: false,
              toggleActions: "play none none reset",
              once: false,
            },
          }
        );
      });
    }
  }, [pixelatedImages]);

  return (
    <Marquee speed={speed} direction={postIndex % 2 === 0 ? 'left' : 'right'} autoFill={true}>
      {pixelatedImages.map((item, index) => (
        <div className={`${projectStyles.item}`} key={index}>
          {item.mediaCheck === 'photo' && item.photo && (
            <div className={projectStyles.photo}>
              <div className="media-wrap">
                <div className="media-pixel">
                  <img
                    src={item.photo.pixelatedSrc}
                    alt={item.photo.node.altText || 'デフォルトのサイト名'} />
                </div>
                <div className="media-origital">
                  <GatsbyImage
                    image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                    style={{ width: '100%', height: '100%' }}
                    alt={item.photo.node.altText || 'デフォルトのサイト名'} />
                </div>
              </div>
            </div>
          )}
          {item.mediaCheck === 'video' && item.video && (
            <div className="media-wrap">
              <div className="media-pixel">
                <img
                  src={item.video.pixelatedSrc}
                  style={{ width: '100%', height: '100%' }}
                  alt="ピクセル化されたビデオサムネイル" />
              </div>
              <div className="media-origital">
                <div className={projectStyles.video} style={{ aspectRatio: item.aspectRatio }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${item.video}?background=1`}
                    title="vimeo"
                    loading="lazy"
                    frameBorder="0"
                  //allow="autoplay;"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Marquee >
  );
});

const Projects = () => {
  const { selectedValue } = useSelectedValue();
  const posts = useContext(ProjectsContext);
  const listRef = useRef(null);

  const renderedPosts = useMemo(() => (
    posts.map((post, postIndex) => (
      <li key={post.uri} className={projectStyles.listItem}>
        <article className={projectStyles.post} itemScope itemType="http://schema.org/Article">
          <Link to={post.uri} itemProp="url" className={projectStyles.link}>
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
            <div className={`${projectStyles.gallery} js-pixel`}>
              <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} postIndex={postIndex + 1} />
            </div>
          </Link>
        </article>
      </li>
    ))
  ), [posts]);

  const handleScroll = useCallback(() => {
    const listElement = listRef.current;
    if (listElement) {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomPosition = listElement.scrollHeight;

      if (scrollPosition >= bottomPosition) {
        const clonedContent = listElement.innerHTML;
        listElement.innerHTML += clonedContent;
        listElement.scrollTop = 0; // スクロール位置を最上部にリセット
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);



  return (
    <section className="projects">
      <ul ref={listRef} data-view={selectedValue} className={projectStyles.list}>
        {renderedPosts}
      </ul>
    </section>
  );
};

export default Projects;
