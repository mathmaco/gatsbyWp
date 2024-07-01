import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';
import * as projectStyles from '../css/components/project.module.scss';

const PhotoItem = ({ photo, width, height }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0.5);
 //const [hasLoaded, setHasLoaded] = useState(false);

 useEffect(() => {
  //if (isVisible && !hasLoaded) {
  if (isVisible) {
   const img = new Image();
   img.src = photo.localFile.childImageSharp.original.src;
   //img.onload = () => setHasLoaded(true);
  }
 }, [isVisible, photo.localFile.childImageSharp.original.src]);
 //[isVisible, hasLoaded, photo.localFile.childImageSharp.original.src]
 const lowResImage = getImage(photo.localFile.childImageSharp.gatsbyImageData);

 return (
  <div
   style={{ width: '100%', height: '100%', position: 'relative' }}
   className={`${projectStyles.media} ${isVisible ? projectStyles.visible : ''}`}
   ref={intersectionRef}
  >
   <div className={projectStyles.photo}>
    {/*{isVisible && hasLoaded ? (*/}
    {isVisible ? (
     <div className={projectStyles.gatsbyImage}>
      <GatsbyImage
       image={lowResImage}
       style={{ width: '100%', height: '100%' }}
       alt={photo.altText || 'デフォルトのサイト名'}
       className={projectStyles.highResImage}
      />
     </div>
    ) : (
     <>
      <div className={projectStyles.pixelPhotoWrap}>
       <PixelPhoto
        src={photo.localFile.childImageSharp.original.src}
        width={width / 10}
        height={height / 10}
        className={projectStyles.pixelPhoto}
       />
       <GatsbyImage
        image={lowResImage}
        style={{ width: '100%', height: '100%' }}
        alt={photo.altText || 'デフォルトのサイト名'}
        className={projectStyles.lowResImage}
       />
      </div>
     </>
    )}
   </div>
  </div>
 );
};

export default PhotoItem;
