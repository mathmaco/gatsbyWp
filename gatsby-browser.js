// gatsby-browser.js

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"
// custom CSS styles
import "./src/css/style.scss"

import React, { useEffect } from "react";

import { MarqueeProvider } from './src/contexts/MarqueeContext';
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';
import Projects from './src/components/projects';
import Header from "./src/components/header";

export const wrapRootElement = ({ element }) => {
 return (
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
};
const LoadFontScript = ({ children }) => {
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=glQh17RBFY8%3D&aa=1&ab=2";
  //script.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&aa=1&ab=2";
  script.async = true;

  script.onload = () => {
   setTimeout(() => { }, 0);
   if (window.FONTPLUS) {
    window.FONTPLUS.reload();
   }

  };

  document.head.appendChild(script);
 }, []);

 return <>{children}</>;
};

export const wrapPageElement = ({ element }) => {
 return <LoadFontScript>{element}</LoadFontScript>;
};