import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0);
 const [hasLoaded, setHasLoaded] = useState(false);
 const [hasPixelated, setHasPixelated] = useState(false); // ピクセル処理が実行されたかどうかを追跡
 const playerRef = useRef(null);

 useEffect(() => {
  if (isVisible && !hasLoaded) {
   setHasLoaded(true);
  }
 }, [isVisible, hasLoaded]);

 useEffect(() => {
  if (playerRef.current) {
   if (isVisible) {
    playerRef.current.getInternalPlayer().play();
   } else {
    playerRef.current.getInternalPlayer().pause();
   }
  }
 }, [isVisible]);

 const handleVideoReady = () => {
  setHasLoaded(true);
  setHasPixelated(true); // ピクセル処理が実行されたことを記録
 };

 return (
  <div style={{ width: '100%', height: '100%', position: 'relative' }} className={projectStyles.media}>
   <div className={projectStyles.video} style={{ aspectRatio }} ref={intersectionRef}>
    {!hasPixelated && !hasLoaded && (
     <PixelPhoto
      src={thumbnailUrl}
      width={width}
      height={height}
     />
    )}
    {hasLoaded && !isVisible && (
     <img
      src={thumbnailUrl}
      width="100%"
      height="100%"
      alt="Thumbnail"
      style={{ position: 'absolute', top: 0, left: 0 }}
      className={projectStyles.thumbnail}
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
      onReady={handleVideoReady}
      style={isVisible ? {} : { display: 'none' }}
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
