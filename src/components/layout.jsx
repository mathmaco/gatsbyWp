import React, { useEffect } from "react";

import { useStaticQuery, graphql } from "gatsby";

const Layout = ({ isHomePage, children }) => {



  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <main data-is-root-path={isHomePage}>{children}</main>
    </>
  );
};

export default Layout;
