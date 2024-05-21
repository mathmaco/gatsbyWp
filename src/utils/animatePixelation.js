import { gsap } from 'gsap';

export const animatePixelation = (pixelatedElement, originalElement) => {
 gsap.to(pixelatedElement, {
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  onComplete: () => {
   gsap.to(originalElement, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
   });
  }
 });
};