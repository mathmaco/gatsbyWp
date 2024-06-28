import React, { useState, useEffect } from "react";
import { Pixelify } from "react-pixelify";
import * as projectStyles from '../css/components/project.module.scss';
import useIntersectionObserver from './useIntersectionObserver';

const PixelPhoto = React.memo(({ src }) => {
 const [pixelSize, setPixelSize] = useState(50);
 const [intersectionRef, isVisible] = useIntersectionObserver(0.1);

 useEffect(() => {
  if (isVisible) {
   const pixelationSequence = [
    { size: 30, delay: 100 },
    { size: 15, delay: 150 },
    { size: 0, delay: 200 },
   ];

   pixelationSequence.forEach(({ size, delay }) => {
    setTimeout(() => {
     setPixelSize(size);
    }, delay);
   });
  } else {
   setPixelSize(50);
  }
 }, [isVisible]);

 return (
  <div ref={intersectionRef} className={projectStyles.pixel}>
   <Pixelify
    src={src}
    width={250}
    height={250}
    centered={true}
    pixelSize={pixelSize}
   />
  </div>
 );
}, (prevProps, nextProps) => {
 return prevProps.src === nextProps.src;
});

export default PixelPhoto;
