import React, { useContext, useMemo, useEffect, useRef, useState } from "react";
import { Autoplay, FreeMode, Loop, Mousewheel, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';




import { ProjectsContext } from '../contexts/ProjectsContext';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as projectStyles from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import Marquee from 'react-fast-marquee';
//import Loop from './loop';
import Star from "./star";
const fillColor = '#c9171e';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const GalleryMarquee = React.memo(({ media, speed, key }) => {

  return (
    <Marquee speed={speed} autoFill={true}>
      {
        media.map((item, index) => (
          (item.viewCheck === 'view1' || item.viewCheck === 'view3') && (
            <div className={projectStyles.item} key={index}>
              {item.mediaCheck === 'photo' && item.photo && (
                <div className={projectStyles.photo}>
                  <GatsbyImage
                    image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                    style={{ width: '100%', height: '100%' }}
                    alt={item.photo.node.altText || 'デフォルトのサイト名'} />
                </div>
              )}
              {item.mediaCheck === 'video' && item.shortVideo && (
                <div className={projectStyles.video} style={{ aspectRatio: item.aspectRatio }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${item.shortVideo}?autoplay=0&loop=1&title=0&byline=0&portrait=0&controls=0&muted=1&autopause=0`}
                    title="vimeo"
                    loading="lazy"
                    frameBorder="0"
                    allow="autoplay;"
                  ></iframe>
                </div>
              )}
            </div>
          )
        ))
      }
    </Marquee>
  );
});

const Projects = React.memo(() => {
  const { selectedValue } = useSelectedValue();
  const posts = useContext(ProjectsContext);
  const swiperRef = useRef(null);

  const projectsRef = useRef(null);
  const [projectsHeight, setProjectsHeight] = useState(0);

  const updateHeight = () => {
    if (projectsRef.current) {
      setProjectsHeight(projectsRef.current.clientHeight);
    }
  };

  useEffect(() => {
    // 要素がマウントされた後に高さを取得する
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // コンポーネントのアンマウント時にリスナーを削除する
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [posts, selectedValue]); // postsを依存配列に追加


  const renderedPosts = useMemo(() => (
    posts.map((post) => (


      <div key={post.uri} className={`${projectStyles.listItem} machine__box`}>
        <article className={projectStyles.post} itemScope itemType="http://schema.org/Article">
          <Link to={post.uri} itemProp="url" className={`${projectStyles.link} play-sound`}>
            <header className={projectStyles.meta}>
              <div className={`${projectStyles.metaList} ${projectStyles.layout1}`}>
                <div className={projectStyles.metaItem}>
                  <div className={projectStyles.metaItemChild}>
                    <h3 className={projectStyles.titleEn}>{post.projects.projectsTitleEn}</h3>
                  </div>
                </div>
                <div className={projectStyles.metaItem}>
                  <div className={projectStyles.metaItemChild}>
                    <div className={projectStyles.subTitleEn}>{post.projects.projectsSubtitleEn}</div>
                  </div>
                </div>
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
                <div className={projectStyles.metaItem}>
                  <div className={projectStyles.date}>{post.date}</div>
                </div>
              </div>
              <div className={`${projectStyles.metaList} ${projectStyles.layout2}`}>
                <div className={projectStyles.metaListHeader}>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      <h2 className={projectStyles.titleJa}>{parse(post.title)}</h2>
                    </div>
                    <div className={projectStyles.metaItemChild}>
                      <div className={projectStyles.subTitleJa}>{post.projects.projectsSubtitleJa}</div>
                    </div>
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
                    <div className={projectStyles.metaItemChild}>
                      <div className={projectStyles.date}>{post.date}</div>
                    </div>
                  </div>
                  <div className={projectStyles.metaItem}></div>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      <Star fill={fillColor} w={15} h={15} />
                    </div>
                  </div>
                </div>
                <div className={projectStyles.metaListFooter}>
                  <div className={projectStyles.metaItem}>
                    <div className={projectStyles.metaItemChild}>
                      <h3 className={projectStyles.titleEn}>{post.projects.projectsTitleEn}</h3>
                    </div>
                    <div className={projectStyles.metaItemChild}>
                      <div className={projectStyles.subTitleEn}>{post.projects.projectsSubtitleEn}</div>
                    </div>
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
                  <div className={projectStyles.metaItem}></div>
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
            <div className={projectStyles.gallery}>
              <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} />
            </div>
          </Link>
        </article>
      </div>
      //<Marquee direction="up"></Marquee>

    ))
  ), [posts]);



  //  useEffect(() => {
  //    const scrollSpeed = 1; // スクロール間隔（ミリ秒）
  //    const scrollDistance = 1; // 1回のスクロールで移動する距離（ピクセル）
  //
  //    const intervalId = setInterval(() => {
  //      const reachedBottom = window.outerHeight + window.scrollY >= document.body.offsetHeight;
  //      if (reachedBottom) {
  //        //window.scrollTo(0, 0);
  //        //gsap.to(window, { scrollTo: 0, duration: 2, ease: "power2.inOut" });
  //      } else {
  //        window.scrollBy(0, scrollDistance);
  //      }
  //    }, scrollSpeed);
  //
  //    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にインターバルをクリア
  //  }, []);

  return (
    <section id="projects" className="projects" style={{ height: `${projectsHeight}px` }}>
      <Swiper
        direction="vertical"
        modules={[Autoplay, FreeMode, Mousewheel, Scrollbar]}
        spaceBetween={0}
        freeMode={true}
        speed={20000}
        loop={true}
        slidesPerView="auto"
        loopedSlides={1}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        //loopedSlides={posts.length} // postsの長さに基づいて設定
        autoplay={{
          delay: 0.5,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onAutoplayResume={() => console.log('Autoplay resumed')}
        onAutoplayPause={() => console.log('Autoplay paused')}
        style={{ height: '100%' }}
      >

        <SwiperSlide ref={projectsRef}>
          <div data-view={selectedValue} className={projectStyles.list}>
            {renderedPosts}
          </div>
        </SwiperSlide>
      </Swiper>
      <div>プロジェクトの高さ: {projectsHeight}px</div>
    </section>
  );
});
export default Projects;