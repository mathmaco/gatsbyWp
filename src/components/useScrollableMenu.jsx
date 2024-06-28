import { useEffect } from 'react';
import { gsap } from 'gsap';

const useScrollableMenu = (posts, menuRef, itemsRef, selectedValue) => {
 useEffect(() => {
  console.log('useEffectが実行されました');

  const $menu = menuRef.current;
  if (!$menu || itemsRef.current.length === 0) return;

  const calculateWrapHeight = () => {
   const itemHeights = itemsRef.current.map(item => item ? item.clientHeight : 0);
   return itemHeights.reduce((total, height) => total + height, 0);
  };

  let wrapHeight = calculateWrapHeight();
  let scrollY = 0;

  const dispose = (scroll) => {
   if (itemsRef.current.length === 0) return;

   let cumulativeHeight = 0;
   const itemHeights = itemsRef.current.map(item => item ? item.clientHeight : 0);
   gsap.set(itemsRef.current, {
    y: (i) => {
     const position = cumulativeHeight + scroll;
     cumulativeHeight += itemHeights[i];
     return position;
    },
    modifiers: {
     y: (y) => {
      const s = gsap.utils.wrap(-itemHeights[0], wrapHeight - itemHeights[itemHeights.length - 1], parseInt(y));
      return `${s}px`;
     }
    }
   });
  };

  dispose(0);

  const handleMouseWheel = (e) => {
   scrollY -= e.deltaY;
   dispose(scrollY);
  };

  let touchStart = 0;
  let touchY = 0;
  const handleTouchStart = (e) => {
   touchStart = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
   touchY = e.touches[0].clientY;
   scrollY += (touchY - touchStart) * 2.5;
   touchStart = touchY;
   dispose(scrollY);
  };

  const handleResize = () => {
   wrapHeight = calculateWrapHeight();
   dispose(scrollY);
  };

  setTimeout(() => {
   handleResize();
  }, 100);

  const addEventListeners = () => {
   if (isTablet()) {
    $menu.addEventListener('touchstart', handleTouchStart);
    $menu.addEventListener('touchmove', debounce(handleTouchMove, 10));
   } else {
    $menu.addEventListener('wheel', handleMouseWheel);
   }
   window.addEventListener('resize', handleResize);
  };

  const removeEventListeners = () => {
   if (isTablet()) {
    $menu.removeEventListener('touchstart', handleTouchStart);
    $menu.removeEventListener('touchmove', handleTouchMove);
   } else {
    $menu.removeEventListener('wheel', handleMouseWheel);
   }
   window.removeEventListener('resize', handleResize);
  };

  const isTablet = () => /iPad|Android|Tablet|PlayBook|Silk|Kindle|BlackBerry/.test(navigator.userAgent);

  addEventListeners();

  const scrollSpeed = .5;
  let scrollAnimationFrame;
  const autoScroll = () => {
   scrollAnimationFrame = requestAnimationFrame(() => {
    scrollY -= scrollSpeed;
    dispose(scrollY);
    autoScroll();
   });
  };
  autoScroll();

  return () => {
   console.log('クリーンアップが実行されました！');
   removeEventListeners();
   cancelAnimationFrame(scrollAnimationFrame);
  };
 }, [posts, menuRef, itemsRef, selectedValue]);

 const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
   clearTimeout(timeout);
   timeout = setTimeout(() => func.apply(this, args), wait);
  };
 };
};

export default useScrollableMenu;
