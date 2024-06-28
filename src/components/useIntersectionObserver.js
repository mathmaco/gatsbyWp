import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (threshold = .5) => {
 const [isVisible, setIsVisible] = useState(false);
 const ref = useRef(null);

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => {
    setIsVisible(entry.isIntersecting);
   },
   { threshold }
  );

  if (ref.current) {
   observer.observe(ref.current);
  }

  return () => {
   if (ref.current) {
    observer.unobserve(ref.current);
   }
  };
 }, [threshold]);

 return [ref, isVisible];
};

export default useIntersectionObserver;
