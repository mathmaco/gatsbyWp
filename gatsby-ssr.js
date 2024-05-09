// gatsby-ssr.js
import React from "react";
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';

import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => {
 return (
  <SelectedValueProvider>
   <ProjectsProvider>
    <TimeProvider>
     <Layout {...props}>{element}</Layout>
    </TimeProvider>
   </ProjectsProvider>
  </SelectedValueProvider>
 );
};
