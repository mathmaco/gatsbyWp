// gatsby-ssr.js
import React from "react";
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';

export const wrapRootElement = ({ element }) => (
 <SelectedValueProvider>
  <ProjectsProvider>
   <TimeProvider>
    {element}
   </TimeProvider>
  </ProjectsProvider>
 </SelectedValueProvider>
);