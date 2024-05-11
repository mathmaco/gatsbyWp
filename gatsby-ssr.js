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
      <Helmet>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@4.0.1/dist/css/yakuhanjp.css" />
       <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=z~SmMymcE-s%3D&aa=1&ab=2"></script>
       <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&pm=1&aa=1&ab=2"></script>
      </Helmet>
      <Header />
      {element}
      <Projects />
     </MarqueeProvider>
    </TimeProvider>
   </ProjectsProvider>
  </SelectedValueProvider>
 );
};