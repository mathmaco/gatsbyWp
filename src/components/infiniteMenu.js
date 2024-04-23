import React, { useState, useEffect, useRef } from 'react';

const InfiniteMenu = ({ children }) => {
 const menuRef = useRef(null);
 const [isMobile, setIsMobile] = useState(false);
 const [scrollPos, setScrollPos] = useState(0);

 useEffect(() => {
  // Mobile detection
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|.../i;
  if (mobileRegex.test(userAgent)) {
   setIsMobile(true);
   document.body.classList.add('mobile');
  } else {
   setIsMobile(false);
   document.body.classList.remove('mobile');
  }
 }, []);

 useEffect(() => {
  const handleResize = () => {
   cloneItems();
  };

  const handleScroll = () => {
   const position = menuRef.current.scrollTop;
   setScrollPos(position);
  };

  const cloneItems = () => {
   if (!menuRef.current || isMobile) return;

   const items = Array.from(menuRef.current.querySelectorAll('.menu__item'));
   const itemHeight = items[0].offsetHeight;
   const fitIn = Math.ceil(window.innerHeight / itemHeight);

   // Remove existing clones
   menuRef.current.querySelectorAll('.loop__clone').forEach(clone => menuRef.current.removeChild(clone));

   // Create new clones
   items.slice(0, fitIn).forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('loop__clone');
    menuRef.current.appendChild(clone);
   });
  };

  window.addEventListener('resize', handleResize);
  menuRef.current.addEventListener('scroll', handleScroll);

  cloneItems(); // Initial call

  return () => {
   window.removeEventListener('resize', handleResize);
   menuRef.current.removeEventListener('scroll', handleScroll);
  };
 }, [isMobile]);

 return (
  <div ref={menuRef} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
   {children}
  </div>
 );
};

export default InfiniteMenu;
