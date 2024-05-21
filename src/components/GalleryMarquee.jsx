import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from 'react-fast-marquee';
import { getVimeoThumbnail } from '../utils/getVimeoThumbnail';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { pixelateImage } from '../utils/pixelateImage';
import * as projectStyles from '../css/components/project.module.scss';

gsap.registerPlugin(ScrollTrigger);

const GalleryMarquee = React.memo(({ media, speed, postIndex }) => {
  const [pixelatedImages, setPixelatedImages] = useState([]);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const pixelateMedia = async () => {
      try {
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
      } catch (error) {
        console.error('Error pixelating media:', error);
      }
    };

    if (media && media.length > 0) {
      pixelateMedia();
    }
  }, [media]);

  useLayoutEffect(() => {
    if (marqueeRef.current) {
      const elements = marqueeRef.current.querySelectorAll('.rfm-child');

      gsap.fromTo(elements,
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.2 }
      );

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: element,
              start: 'top 50%',
              end: 'top bottom',
              scrub: false,
              toggleActions: 'play none none none',
              once: false,
            },
          }
        );
      });
    }
  }, [pixelatedImages]);

  return (
    <Marquee speed={speed} direction={postIndex % 2 === 0 ? 'left' : 'right'} autoFill={true} ref={marqueeRef}>
      <section className={projectStyles.itemWrap}>
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
                      allow="autoplay;"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </Marquee>
  );
});

export default GalleryMarquee;
