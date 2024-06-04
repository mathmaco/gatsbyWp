import React, { useContext, useMemo, useEffect } from "react";
// Import Swiper React components

import { Autoplay, FreeMode, Loop } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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



const GalleryMarquee = React.memo(({ media, speed }) => {
 return (
  //<Marquee speed={speed} autoFill={true}>
  <>
   <Swiper
    modules={[Autoplay, FreeMode]}
    spaceBetween={0}
    freeMode={true}
    speed={5000} // スクロール速度
    loop={true}
    slidesPerView="auto"
    autoplay={{
     delay: 0.5,
     disableOnInteraction: false,
    }}
   >
    {
     media.map((item, index) => (
      (item.viewCheck === 'view1' || item.viewCheck === 'view3') && (
       <SwiperSlide key={index}><div className={projectStyles.item} key={index}>
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
           src={`https://player.vimeo.com/video/${item.shortVideo}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&muted=1&autopause=0`}
           title="vimeo"
           loading="lazy"
           frameBorder="0"
           allow="autoplay;"
          ></iframe>
         </div>
        )}
       </div>
       </SwiperSlide>
      )
     ))
    }
   </Swiper>
  </>
  //</Marquee>
 );
});

const Projects = React.memo(() => {
 const { selectedValue } = useSelectedValue();
 const posts = useContext(ProjectsContext);

 const renderedPosts = useMemo(() => (
  posts.map((post) => (

   <li key={post.uri} className={`${projectStyles.listItem} machine__box`}>
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
   </li>
   //<Marquee direction="up"></Marquee>

  ))
 ), [posts]);

 //  useEffect(() => {
 //    const scrollSpeed = 50; // スクロール間隔（ミリ秒）
 //    const scrollDistance = 1; // 1回のスクロールで移動する距離（ピクセル）
 //
 //    const intervalId = setInterval(() => {
 //      const reachedBottom = window.outerHeight + window.scrollY >= document.body.offsetHeight;
 //      if (reachedBottom) {
 //        window.scrollTo(0, 0); // ページの最上部に戻る
 //      } else {
 //        window.scrollBy(0, scrollDistance);
 //      }
 //    }, scrollSpeed);
 //
 //    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にインターバルをクリア
 //  }, []);

 return (
  <section id="projects" className="projects">
   <ul data-view={selectedValue} className={projectStyles.list}>
    {renderedPosts}
   </ul>
  </section>
 );
});
export default Projects;