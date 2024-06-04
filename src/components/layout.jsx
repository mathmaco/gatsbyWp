//layout.jsx
import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Howl } from "howler";
import hoverSound from "../assets/se/blip.mp3";




const Layout = ({ isHomePage, children }) => {

  useEffect(() => {
    const sound = new Howl({
      src: [hoverSound],
      preload: true,
    });

    const handleMouseOver = (event) => {
      if (event.target.classList.contains('play-sound')) {
        sound.play();
      }
    };

    const addListeners = () => {
      document.querySelectorAll('.play-sound').forEach(element => {
        element.addEventListener('mouseenter', handleMouseOver);
      });
    };

    const removeListeners = () => {
      document.querySelectorAll('.play-sound').forEach(element => {
        element.removeEventListener('mouseenter', handleMouseOver);
      });
    };

    // Add listeners on initial load
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

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
  `)

  return (
    <>
      <main data-is-root-path={isHomePage}>{children}</main>
    </>
  )
}
export default Layout
