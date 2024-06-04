// gatsby-browser.js

// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";
// custom CSS styles
import "./src/css/style.scss";

import React, { useEffect } from "react";
import { Howl } from 'howler';
import hoverSound from "./src/assets/se/blip.mp3";

import { MarqueeProvider } from './src/contexts/MarqueeContext';
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';
import Projects from './src/components/projects';
import Header from "./src/components/header";

const LoadSound = ({ children }) => {
 useEffect(() => {
  const sound = new Howl({
   src: [hoverSound],
   preload: true,
  });

  const handleMouseOver = (event) => {
   if (event.target.classList.contains('play-sound')) {
    sound.play();
   }
  };

  const handleClick = (event) => {
   if (event.target.classList.contains('play-sound')) {
    sound.play();
   }
  };

  document.body.addEventListener('click', handleClick, true);
  document.body.addEventListener('mouseenter', handleMouseOver, true);

  return () => {
   document.body.removeEventListener('click', handleClick, true);
   document.body.removeEventListener('mouseenter', handleMouseOver, true);
  };
 }, []);

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
     {element}
     <Projects />
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
