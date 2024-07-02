import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0);
 const [hasLoaded, setHasLoaded] = useState(false);

 useEffect(() => {
  if (isVisible) {
   setHasLoaded(true); // ビデオがビューポート内に入ったら再度読み込み待機状態にする
  }
 }, [isVisible]);

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
    {isVisible && (
     <ReactPlayer
      url={videoUrl}
      playing={true}
      loop={true}
      controls={false}
      muted={true}
      width="100%"
      height="100%"
      onReady={() => setHasLoaded(true)}
      style={!hasLoaded ? { display: 'none' } : {}}
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
