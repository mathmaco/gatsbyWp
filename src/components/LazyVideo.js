import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0);
 const [hasLoaded, setHasLoaded] = useState(false);
 const playerRef = useRef(null);

 useEffect(() => {
  if (isVisible && !hasLoaded) {
   setHasLoaded(true);
  }
 }, [isVisible, hasLoaded]);

 return (
  <div style={{ width: '100%', height: '100%', position: 'relative' }} className={projectStyles.media}>
   <div className={projectStyles.video} style={{ aspectRatio }} ref={intersectionRef}>
    {!hasLoaded && (
     <PixelPhoto
      src={thumbnailUrl}
      width={width}
      height={height}
     />
    )}
    {hasLoaded && (
     <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      playing={isVisible}
      loop={true}
      controls={false}
      muted={true}
      width="100%"
      height="100%"
      style={!isVisible ? { display: 'none' } : {}}
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
