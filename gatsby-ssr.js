// gatsby-ssr.js

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
      <Projects />
      {element}
     </MarqueeProvider>
    </TimeProvider>
   </ProjectsProvider>
  </SelectedValueProvider>
 );
};
//
//export const onRenderBody = ({ setHeadComponents }) => {
// setHeadComponents([
//  <meta
//   key="csp"
//   httpEquiv="Content-Security-Policy"
//   content="default-src 'self'; connect-src 'self' https://*.vimeocdn.com https://player.vimeo.com https://vimeo.com;"
//  />,
// ]);
//};
