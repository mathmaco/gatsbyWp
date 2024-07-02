import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0);
 const [hasLoaded, setHasLoaded] = useState(false);
 const [hasPixelated, setHasPixelated] = useState(false); // ピクセル処理が実行されたかどうかを追跡
 const [showThumbnail, setShowThumbnail] = useState(true); // サムネイルの表示制御
 const playerRef = useRef(null);

 useEffect(() => {
  if (isVisible && !hasPixelated) {
   setHasPixelated(true);
  }
 }, [isVisible, hasPixelated]);

 useEffect(() => {
  if (isVisible) {
   setShowThumbnail(false);
  } else if (hasLoaded) {
   setShowThumbnail(true);
   if (playerRef.current) {
    playerRef.current.seekTo(0); // ビデオを最初に戻す
   }
  }
 }, [isVisible, hasLoaded]);

 const handleVideoReady = () => {
  setHasLoaded(true);
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
    {hasPixelated && (
     <>
      <img
       src={thumbnailUrl}
       className={`${projectStyles.thumbnail} ${!showThumbnail ? projectStyles.hidden : ''}`}
       alt="Thumbnail"
      />
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
      />
     </>
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
