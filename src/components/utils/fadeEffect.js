// utils/animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function fadeEffect() {
 const boundElm = document.querySelectorAll(".fade-effect");

 if (boundElm.length === 0) {
  return; // 要素が存在しない場合、関数を終了
 }

 boundElm.forEach((element, index) => {
  gsap.to(element, {
   opacity: 1, y: 0, duration: 0.5, delay: index * 0.01,
   scrollTrigger: {
    once: true,
    trigger: element,
    start: "top 100%",
    end: "center center",
    scrub: false,
    toggleActions: "play none none none",
    onEnter: () => {

    },
   }
  }
  );
 });
}
