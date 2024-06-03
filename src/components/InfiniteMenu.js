import React, { useEffect, useRef } from 'react';

const winsize = { width: window.innerWidth, height: window.innerHeight };

// https://stackoverflow.com/a/3540295
const isMobile = /android|bb\d+|meego.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|iphone|ipod|ipad|iris|kindle|Android|Silk|lge|maemo|midp|mmp|netfront|opera m(ob|in)i|palm|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.browser|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent);

const InfiniteMenu = ({ items }) => {
 const containerRef = useRef(null);
 const clonesHeight = useRef(0);
 const scrollHeight = useRef(0);
 const scrollPos = useRef(0);

 const getScrollPos = () => {
  return (containerRef.current.pageYOffset || containerRef.current.scrollTop) - (containerRef.current.clientTop || 0);
 };

 const setScrollPos = (pos) => {
  containerRef.current.scrollTop = pos;
 };

 const cloneItems = () => {
  const itemHeight = containerRef.current.querySelector('.menu__item').offsetHeight;
  const fitIn = Math.ceil(winsize.height / itemHeight);
  const menuItems = [...containerRef.current.querySelectorAll('.menu__item')];

  containerRef.current.querySelectorAll('.loop__clone').forEach(clone => clone.remove());

  let totalClones = 0;
  menuItems.filter((_, index) => index < fitIn).forEach(target => {
   const clone = target.cloneNode(true);
   clone.classList.add('loop__clone');
   containerRef.current.appendChild(clone);
   ++totalClones;
  });

  clonesHeight.current = totalClones * itemHeight;
  scrollHeight.current = containerRef.current.scrollHeight;
 };

 const initScroll = () => {
  scrollPos.current = getScrollPos();
  if (scrollPos.current <= 0) {
   setScrollPos(1);
  }
 };

 const scrollUpdate = () => {
  scrollPos.current = getScrollPos();

  if (clonesHeight.current + scrollPos.current >= scrollHeight.current) {
   setScrollPos(1);
  } else if (scrollPos.current <= 0) {
   setScrollPos(scrollHeight.current - clonesHeight.current);
  }
 };

 const renderLoop = () => {
  scrollUpdate();
  requestAnimationFrame(renderLoop);
 };

 useEffect(() => {
  if (!isMobile) {
   cloneItems();
   initScroll();
   renderLoop();

   window.addEventListener('resize', () => {
    cloneItems();
    initScroll();
   });

   return () => {
    window.removeEventListener('resize', () => {
     cloneItems();
     initScroll();
    });
   };
  } else {
   document.body.classList.add('mobile');
  }
 }, []);

 return (
  <div ref={containerRef} className="menu">
   {items.map((item, index) => (
    <div className="menu__item" key={index}>
     {item}
    </div>
   ))}
  </div>
 );
};

export default InfiniteMenu;
