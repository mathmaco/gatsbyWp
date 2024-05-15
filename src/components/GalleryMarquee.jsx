import React, { useRef, useEffect } from "react";
import { GatsbyImage } from 'gatsby-plugin-image';
import gsap from "gsap";
import * as projectStyles from '../css/components/project.module.scss';

const GalleryMarquee = ({ media, speed, postIndex }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeItems = marqueeRef.current.children;
    const direction = postIndex % 2 === 0 ? 'left' : 'right';
    const distance = direction === 'left' ? '-100%' : '100%';

    gsap.to(marqueeItems, {
      x: distance,
      duration: speed,
      ease: "none",
      repeat: -1,
      stagger: {
        each: 1,
        from: direction === 'left' ? 'start' : 'end'
      }
    });
  }, [media, speed, postIndex]);

  return (
    <div className={projectStyles.marqueeContainer} ref={marqueeRef}>
      {media.map((item, index) => (
        <div className={projectStyles.item} key={index}>
          {item.mediaCheck === 'photo' && item.photo && (
            <div className={projectStyles.photo}>
              <GatsbyImage
                image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
                style={{ width: '100%', height: '100%' }}
                alt={item.photo.node.altText || 'デフォルトのサイト名'} />
            </div>
          )}
          {item.mediaCheck === 'video' && item.video && (
            <div className={projectStyles.video} style={{ paddingTop: item.aspect + '%' }}>
              <iframe
                src={`https://player.vimeo.com/video/${item.video}?autoplay=0&loop=1&title=0&byline=0&portrait=0&controls=0&muted=1&autopause=0`}
                title="vimeo"
                loading="lazy"
                frameBorder="0"
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryMarquee;
