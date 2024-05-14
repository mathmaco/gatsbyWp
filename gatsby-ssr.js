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
       {/*<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=glQh17RBFY8%3D&aa=1&ab=1"></script>*/}
       <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?LqAVuNxPvBc%3D&box=glQh17RBFY8%3D&aa=1&ab=2"></script>
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