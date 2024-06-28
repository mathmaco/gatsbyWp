<<<<<<< HEAD
import React, { useState } from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';
import PixelPhoto from './PixelPhoto';

const LazyVideo = ({ videoUrl, thumbnailUrl, width, height, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0.1);
 const [hasLoaded, setHasLoaded] = useState(false);
=======
import React from "react";
import ReactPlayer from 'react-player';
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';

const LazyVideo = ({ videoUrl, aspectRatio }) => {
 const [intersectionRef, isVisible] = useIntersectionObserver(0.1);
>>>>>>> a9468ecaf988a6452d1ef72effdcd1addcb14f0e

 return (
  <div style={{ width: '100%', height: '100%', position: 'relative' }} className={projectStyles.media}>
   <div className={projectStyles.video} style={{ aspectRatio }} ref={intersectionRef}>
<<<<<<< HEAD
    {!hasLoaded && (
     <PixelPhoto
      src={thumbnailUrl}
      width={width / 5}
      height={height / 5}
     />
    )}
=======
>>>>>>> a9468ecaf988a6452d1ef72effdcd1addcb14f0e
    {isVisible && (
     <ReactPlayer
      url={videoUrl}
      playing={true}
      loop={true}
      controls={false}
      muted={true}
      width="100%"
      height="100%"
<<<<<<< HEAD

      onPlay={() => setHasLoaded(true)}
      style={hasLoaded ? {} : { display: 'none' }}
=======
>>>>>>> a9468ecaf988a6452d1ef72effdcd1addcb14f0e
     />
    )}
   </div>
  </div>
 );
};

export default LazyVideo;
