import React from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';

const LazyVideo = ({ videoUrl, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0.1);

 return (
  <div style={{ width: '100%', height: '100%', position: 'relative' }} className={projectStyles.media}>
   <div className={projectStyles.video} style={{ aspectRatio }} ref={intersectionRef}>
    {isVisible && (
     <ReactPlayer
      url={videoUrl}
      playing={true}
      loop={true}
      controls={false}
      muted={true}
      width="100%"
      height="100%"
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
