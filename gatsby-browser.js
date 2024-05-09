// gatsby-browser.js

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
import "./src/css/style.scss"

// gatsby-browser.js および gatsby-ssr.js
import React from "react";
import { MarqueeProvider } from './src/contexts/MarqueeContext';
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => {
 return (
  <SelectedValueProvider>
   <ProjectsProvider>
    <TimeProvider>
     <MarqueeProvider>
      <Layout {...props}>{element}</Layout>
     </MarqueeProvider>
    </TimeProvider>
   </ProjectsProvider>
  </SelectedValueProvider>
 );
};
