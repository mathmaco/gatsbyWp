import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';
import * as projectStyles from '../css/components/project.module.scss';

const PhotoItem = ({ photo, width, height }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0.1);
 const [hasLoaded, setHasLoaded] = useState(false);

 useEffect(() => {
  if (isVisible && !hasLoaded) {
   const img = new Image();
   img.src = photo.localFile.childImageSharp.original.src;
   img.onload = () => setHasLoaded(true);
  }
 }, [isVisible, hasLoaded, photo.localFile.childImageSharp.original.src]);

 const lowResImage = getImage(photo.localFile.childImageSharp.gatsbyImageData);

 return (
  <div
   style={{ width: '100%', height: '100%', position: 'relative' }}
   className={`${projectStyles.media} ${isVisible ? projectStyles.visible : ''}`}
   ref={intersectionRef}
  >
   <GatsbyImage
    image={lowResImage}
    style={{ width: '100%', height: '100%' }}
    alt={photo.altText || 'デフォルトのサイト名'}
    className={projectStyles.lowResImage}
   />
   {isVisible && hasLoaded ? (
    <GatsbyImage
     image={lowResImage}
     style={{ width: '100%', height: '100%' }}
     alt={photo.altText || 'デフォルトのサイト名'}
     className={projectStyles.highResImage}
    />
   ) : (
    <PixelPhoto
     src={photo.localFile.childImageSharp.original.src}
     width={width / 10}
     height={height / 10}
     className={projectStyles.pixelPhoto}
    />
   )}
  </div>
 );
};

export default PhotoItem;
