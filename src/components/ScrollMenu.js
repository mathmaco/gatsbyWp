import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ScrollMenu = ({ items }) => {
 const menuRef = useRef(null);
 const itemRefs = useRef([]);
 const [scrollY, setScrollY] = useState(0);
 const [menuHeight, setMenuHeight] = useState(0);
 const [itemHeight, setItemHeight] = useState(0);
 const [wrapHeight, setWrapHeight] = useState(0);

 const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
 };

 const dispose = (scroll) => {
  gsap.set(itemRefs.current, {
   y: (i) => i * itemHeight + scroll,
   modifiers: {
    y: (y) => {
     const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y));
     return `${s}px`;
    }
   }
  });
 };

 useEffect(() => {
  setMenuHeight(menuRef.current.clientHeight);
  setItemHeight(itemRefs.current[0].clientHeight);
  setWrapHeight(itemRefs.current.length * itemHeight);
  dispose(0);

  const handleResize = () => {
   setMenuHeight(menuRef.current.clientHeight);
   setItemHeight(itemRefs.current[0].clientHeight);
   setWrapHeight(itemRefs.current.length * itemHeight);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
 }, []);

 useEffect(() => {
  const handleWheel = (event) => {
   setScrollY((prev) => prev - event.deltaY);
   dispose(scrollY);
  };

  menuRef.current.addEventListener('wheel', handleWheel);
  return () => menuRef.current.removeEventListener('wheel', handleWheel);
 }, [scrollY]);

 useEffect(() => {
  let oldScrollY = 0;
  const render = () => {
   const y = lerp(oldScrollY, scrollY, 0.1);
   dispose(y);

   const scrollSpeed = y - oldScrollY;
   oldScrollY = y;

   gsap.to(itemRefs.current, {
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.005,
    rotate: scrollSpeed * 0.2,
   });

   requestAnimationFrame(render);
  };

  render();
 }, [scrollY]);

 return (
  <div className="menu" ref={menuRef}>
   {items.map((item, index) => (
    <div
     key={index}
     className="menu--item"
     ref={(el) => (itemRefs.current[index] = el)}
    >
     {item}
    </div>
   ))}
  </div>
 );
};

export default ScrollMenu;
