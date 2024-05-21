import React, { useContext, useMemo, useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import parse from 'html-react-parser';

import { ProjectsContext } from '../contexts/ProjectsContext';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import { getVimeoThumbnail } from './utils/getVimeoThumbnail';
import { pixelateImage } from './utils/pixelateImage';
import Star from "./star";

import * as projectStyles from '../css/components/project.module.scss';

gsap.registerPlugin(ScrollTrigger);

const fillColor = '#c9171e';

const GalleryMarquee = React.memo(({ media, direction = 'left', speed, duration }) => {

 const marqueeRef = useRef(null);
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
  const marqueeElement = marqueeRef.current;
  if (!marqueeElement) return;

  const marqueeInner = marqueeElement.querySelector('.marquee-content');

  // marqueeInner内の内容を複製して追加
  const clone = marqueeInner.innerHTML;
  marqueeInner.innerHTML += clone + clone;

  const animation = gsap.to(marqueeInner, {
   x: direction === 'left' ? `-=${marqueeInner.offsetWidth / 2}` : `+=${marqueeInner.offsetWidth / 2}`,
   duration: speed,
   ease: 'linear',
   repeat: -1
  });

  return () => {
   animation.kill();
  };
 }, [direction, speed, pixelatedImages]);

 return (
  <div className="annotation-marquee-container" ref={marqueeRef} data-marquee-duration={duration}>
   <div className="annotation-marquee">
    <div className="marquee-content">
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
          <div className="media-original">
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
         <div className="media-original">
          <div className="video" style={{ aspectRatio: item.aspectRatio }}>
           <iframe
            src={`https://player.vimeo.com/video/${item.video}?background=1`}
            title="vimeo"
            loading="lazy"
            frameBorder="0"
            allow="autoplay;"
           ></iframe>
          </div>
         </div>
        </div>
       )}
      </div>
     ))}
    </div>
   </div>
  </div>
 );
});

const Projects = () => {
 const { selectedValue } = useSelectedValue();
 const posts = useContext(ProjectsContext);

 const renderedPosts = useMemo(() => (
  posts.map((post, postIndex) => (
   <li key={post.uri} className={projectStyles.listItem}>
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
      <div className={`${projectStyles.gallery} js-pixel`}>
       <GalleryMarquee media={post.projects.projectsMedia} direction={postIndex % 2 === 0 ? 'left' : 'right'} speed={post.projects.projectsGallerySpeed} />
      </div>
     </Link>
    </article>
   </li>
  ))
 ), [posts]);

 return (
  <section className="projects">
   <ul data-view={selectedValue} className={projectStyles.list}>
    {renderedPosts}
   </ul>
  </section>
 );
};

export default Projects;
