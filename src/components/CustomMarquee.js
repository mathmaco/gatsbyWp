// src/components/CustomMarquee.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAnimation } from '../contexts/AnimationContext';

const CustomMarquee = ({ children, speed = 200 }) => {
 const marqueeRef = useRef(null);
 const { animationProgress, setAnimationProgress } = useAnimation();

 useEffect(() => {
  const element = marqueeRef.current;
  const timeline = gsap.timeline({ repeat: -1, paused: true });

  timeline.fromTo(element, { x: '100%' }, { x: '-100%', duration: speed, ease: "none" });

  // アニメーション進行度に基づいて再開
  timeline.progress(animationProgress);
  timeline.play();

  return () => {
   // アンマウント時に進行度を保存
   setAnimationProgress(timeline.progress());
   timeline.kill();
  };
 }, []);

 return (
  <div ref={marqueeRef}>
   {children}
  </div>
 );
};

export default CustomMarquee;
