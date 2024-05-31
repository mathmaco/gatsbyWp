import React, { useEffect, useRef, useState } from "react";

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { getVimeoThumbnail } from '../utils/getVimeoThumbnail'; // Vimeoサムネイルを取得する関数
import { pixelateImage } from '../utils/pixelateImage';
import Marquee from 'react-fast-marquee';
import * as projectStyles from '../css/components/project.module.scss';


gsap.registerPlugin(ScrollTrigger);

const GalleryMarquee = React.memo(({ media, speed, postIndex }) => {
 const [pixelatedImages, setPixelatedImages] = useState([]);
 const marqueeRef = useRef(null);

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
  ScrollTrigger.refresh();
  if (pixelatedImages.length === 0) return;

  pixelatedImages.forEach((item, index) => {

   ScrollTrigger.create({
    trigger: `#projects`,
    start: "top 0%",
    endTrigger: "footer", // フッター要素を終了トリガーとする
    end: "top bottom",
    markers: false,
    toggleActions: "play none none none",
    onEnter: () => {
     gsap.to(`.media-pixel`, { zIndex: -2, stagger: 0.1 });
     gsap.to(`.media-origital`, { zIndex: 2, stagger: 0.1 });
    },
    onLeaveBack: () => {
     //gsap.to(`.media-pixel`, { autoAlpha: 1, stagger: 0.05 });
     //gsap.to(`.media-origital`, { autoAlpha: 0, stagger: 0.05 });
    }
   });


  });

  return () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
 }, [pixelatedImages, postIndex]);

 return (
  <div ref={marqueeRef}>
   <Marquee speed={speed} direction={postIndex % 2 === 0 ? 'left' : 'right'} autoFill={true}>
    {pixelatedImages.map((item, index) => (
     <div key={index} className="">
      {
       item.mediaCheck === 'photo' && item.photo && (
        <div className={`${projectStyles.item}`}>
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
        </div>
       )
      }
      {
       item.mediaCheck === 'video' && item.video && (
        <div className={`${projectStyles.item}`}>
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
             allow="autoplay;"
            ></iframe>
           </div>
          </div>
         </div>
        </div>
       )
      }
     </div>
    ))}
   </Marquee>
  </div>
 );
});

export default GalleryMarquee;
