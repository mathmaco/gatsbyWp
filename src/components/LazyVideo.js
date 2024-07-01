import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0);
 const [hasLoaded, setHasLoaded] = useState(false);
 const [hasPixelated, setHasPixelated] = useState(false); // ピクセル処理が実行されたかどうかを追跡
 const [showLight, setShowLight] = useState(true); // サムネイルの表示制御
 const playerRef = useRef(null);

 useEffect(() => {
  if (isVisible && !hasPixelated) {
   setHasPixelated(true);
  }
 }, [isVisible, hasPixelated]);

 const handleVideoReady = () => {
  setHasLoaded(true);
  setShowLight(false); // ビデオがロードされた後にサムネイルを非表示にする
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
      light={showLight ? thumbnailUrl : false} // サムネイル画像をプレースホルダーとして使用
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
