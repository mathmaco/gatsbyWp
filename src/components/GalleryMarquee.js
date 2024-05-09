import React from 'react';
import { useMarquee } from '../contexts/MarqueeContext';
import Marquee from 'react-fast-marquee';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as project from '../css/components/project.module.scss';

const GalleryMarquee = () => {
 const { marqueeData } = useMarquee();

 // marqueeData が正しくロードされているか確認
 if (!marqueeData || !marqueeData.media || marqueeData.media.length === 0) {
  return <div>Loading...</div>; // データがない場合の処理
 }

 return (
  <Marquee speed={marqueeData.speed} direction="left" gradient={false}>
   {marqueeData.media.map((item, index) => (
    <div className={project.item} key={index}>
     {item.mediaCheck === 'photo' && item.photo && (
      <div className={project.photo}>
       <GatsbyImage
        image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
        alt={item.photo.node.altText || 'デフォルトのサイト名'}
       />
      </div>
     )}
     {item.mediaCheck === 'video' && item.video && (
      <div className={project.video}>
       <iframe
        src={`https://player.vimeo.com/video/${item.video}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&mute=1&autopause=0`}
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
        allow="autoplay; fullscreen"
        title={`video-${index}`}
       ></iframe>
      </div>
     )}
    </div>
   ))}
  </Marquee>
 );
};

export default GalleryMarquee;
