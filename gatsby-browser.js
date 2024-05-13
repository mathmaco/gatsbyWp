// gatsby-browser.js

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
import "./src/css/style.scss"



import React from "react";



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

export const onClientEntry = () => {
 const script = document.createElement('script');
 script.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=glQh17RBFY8%3D&aa=1&ab=1";
 script.defer = true;
 document.body.appendChild(script);
 const script2 = document.createElement('script');
 script2.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=glQh17RBFY8%3D&aa=1&ab=2";
 script2.defer = true;
 document.body.appendChild(script2);

 // ここではクリーンアップ関数を追加しない
};