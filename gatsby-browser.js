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
import hoverSound from "./src/assets/se/synth1.mp3";

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

  const addListeners = () => {
   document.querySelectorAll('.play-sound').forEach(element => {
    element.addEventListener('mouseenter', handleMouseOver);
   });
  };

  const removeListeners = () => {
   document.querySelectorAll('.play-sound').forEach(element => {
    element.removeEventListener('mouseenter', handleMouseOver);
   });
  };

  // Add listeners on initial load
  addListeners();

  return () => {
   removeListeners();
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
