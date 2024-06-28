import { useState, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

const useIntersectionObserver = (threshold = 0.1) => {
 const [isVisible, setIsVisible] = useState(false);
 const intersectionRef = useRef(null);
 const intersection = useIntersection(intersectionRef, {
  root: null,
  rootMargin: '0px',
  threshold
 });

 useEffect(() => {
  if (intersection && intersection.isIntersecting) {
   setIsVisible(true);
  } else {
   setIsVisible(false);
  }
 }, [intersection]);

 return [intersectionRef, isVisible];
};

export default useIntersectionObserver;
