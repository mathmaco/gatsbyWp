// normalize CSS across browsers
import "./src/css/normalize.css";
// custom CSS styles
import "./src/css/style.scss";

import React, { useEffect, useCallback } from "react";
import useSound from 'use-sound';
import soundUrl from './src/assets/se/blip.mp3';

import { MarqueeProvider } from './src/contexts/MarqueeContext';
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';
import Projects from './src/components/projects';
import Header from "./src/components/header";

const LoadSound = ({ children }) => {
 const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });

 const handleMouseEnter = useCallback(() => {
  play();
 }, [play]);

 const handleMouseLeave = useCallback(() => {
  stop();
 }, [stop]);

 useEffect(() => {
  const elements = document.querySelectorAll('.play-sound');
  elements.forEach(elm => {
   elm.addEventListener('mouseenter', handleMouseEnter);
   elm.addEventListener('mouseleave', handleMouseLeave);
  });

  return () => {
   elements.forEach(elm => {
    elm.removeEventListener('mouseenter', handleMouseEnter);
    elm.removeEventListener('mouseleave', handleMouseLeave);
   });
  };
 }, [handleMouseEnter]);

 return <>{children}</>;
};

const LoadFontScript = ({ children }) => {
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&aa=1&ab=2";
  script.async = true;

  script.onload = () => {
   if (window.FONTPLUS) {
    window.FONTPLUS.reload();
   }
  };

  document.head.appendChild(script);
 }, []);

 return <>{children}</>;
};

export const wrapRootElement = ({ element }) => (
 <SelectedValueProvider>
  <ProjectsProvider>
   <TimeProvider>
    <MarqueeProvider>
     <Header />
     <Projects />
     {element}
    </MarqueeProvider>
   </TimeProvider>
  </ProjectsProvider>
 </SelectedValueProvider>
);

export const wrapPageElement = ({ element }) => (
 <LoadSound>
  <LoadFontScript>
   {element}
  </LoadFontScript>
 </LoadSound>
);
