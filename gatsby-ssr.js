// gatsby-ssr.js

import React from "react";
import { Helmet } from 'react-helmet';
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

export const onRenderBody = ({ setHeadComponents }) => {
 setHeadComponents([
  <link key="yakuhanjp-css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@4.0.1/dist/css/yakuhanjp.css" />,
  <script key="fontplus-script1" src="https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=z~SmMymcE-s%3D&aa=1&ab=2" />,
  <script key="fontplus-script2" src="https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&pm=1&aa=1&ab=2" />
 ]);
};