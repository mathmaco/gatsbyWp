import React, { useContext, useMemo, useEffect, useRef } from "react";
import { ProjectsContext } from '../contexts/ProjectsContext';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import * as projectStyles from '../css/components/project.module.scss';
import { useSelectedValue } from '../contexts/SelectedValueContext';
import Marquee from 'react-fast-marquee';
import Star from "./star";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fillColor = '#c9171e';

const GalleryMarquee = React.memo(({ media, speed, key }) => {
 return (
  <Marquee speed={speed} autoFill={true}>
   {
    media.map((item, index) => (
     (item.viewCheck === 'view1' || item.viewCheck === 'view3') && (
      <div className={projectStyles.item} key={index}>
       {item.mediaCheck === 'photo' && item.photo && (
        <div className={projectStyles.photo}>
         <GatsbyImage
          image={item.photo.node.localFile.childImageSharp.gatsbyImageData}
          style={{ width: '100%', height: '100%' }}
          alt={item.photo.node.altText || 'デフォルトのサイト名'} />
        </div>
       )}
       {item.mediaCheck === 'video' && item.shortVideo && (
        <div className={projectStyles.video} style={{ aspectRatio: item.aspectRatio }}>
         <iframe
          src={`https://player.vimeo.com/video/${item.shortVideo}?autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&muted=1&autopause=0`}
          title="vimeo"
          loading="lazy"
          frameBorder="0"
          allow="autoplay;"
         ></iframe>
        </div>
       )}
      </div>
     )
    ))
   }
  </Marquee>
 );
});

const Projects = React.memo(() => {
 const { selectedValue } = useSelectedValue();
 const posts = useContext(ProjectsContext);
 const containerRef = useRef(null);

 const renderedPosts = useMemo(() => (
  posts.map((post) => (
   <div key={post.uri} className={`${projectStyles.listItem} js-item`}>
    <article className={`${projectStyles.post}`} itemScope itemType="http://schema.org/Article">
     <Link to={post.uri} itemProp="url" className={`${projectStyles.link} play-sound`}>
      <header className={projectStyles.meta}>
       {/* Meta content */}
       <div className={`${projectStyles.metaList} ${projectStyles.layout1}`}>
        {/* Additional meta content */}
       </div>
       <div className={`${projectStyles.metaList} ${projectStyles.layout2}`}>
        {/* Additional meta content */}
       </div>
      </header>
      <div className={`${projectStyles.gallery}`}>
       <GalleryMarquee media={post.projects.projectsMedia} speed={post.projects.projectsGallerySpeed} />
      </div>
     </Link>
    </article>
   </div>
  ))
 ), [posts]);

 useEffect(() => {
  const scrollTriggerInstance = ScrollTrigger.create({
   start: 0,
   end: "max",
   onLeave: self => {
    self.scroll(1);
    ScrollTrigger.update();
   },
   onLeaveBack: self => {
    self.scroll(ScrollTrigger.maxScroll(window) - 1);
    ScrollTrigger.update();
   }
  });

  const recipe = document.querySelectorAll(".js-item");

  recipe.forEach((recipe) => {
   gsap.to(recipe, {
    opacity: 1,
    repeat: 1,
    yoyo: true,
    ease: "none",
    scrollTrigger: {
     trigger: recipe,
     start: "bottom bottom",
     end: "top top",
     markers: true,
     scrub: true,
    }
   });
  });

  return () => {
   scrollTriggerInstance.kill();
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
 }, [renderedPosts]);

 return (
  <section id="projects" className="projects">
   <div ref={containerRef} data-view={selectedValue} className={`${projectStyles.list}`}>
    {renderedPosts}
   </div>
  </section>
 );
});

export default Projects;
