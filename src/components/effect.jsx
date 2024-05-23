import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// React コンポーネントまたはカスタムフック内で使用
export const useHandleAnimation = () => {
 const [pixelatedImages, setPixelatedImages] = useState([]);

 useEffect(() => {
  if (pixelatedImages.length === 0) return;

  const triggers = pixelatedImages.map((item, index) => {
   return ScrollTrigger.create({
    trigger: `#projects`,
    start: "top 0%",
    endTrigger: "footer", // フッター要素を終了トリガーとする
    end: "top bottom",
    markers: false,
    toggleActions: "play none none none",
    onEnter: () => {
     gsap.to(`.media-pixel`, { zIndex: -2, stagger: 0.1 });
     gsap.to(`.media-origital`, { zIndex: 2, stagger: 0.1 });
    },
    onLeaveBack: () => {
     gsap.to(`.media-pixel`, { zIndex: 1, stagger: 0.1 });
     gsap.to(`.media-origital`, { zIndex: -1, stagger: 0.1 });
    }
   });
  });

  return () => {
   triggers.forEach(trigger => trigger.kill());
  };
 }, [pixelatedImages]);  // 依存配列に pixelatedImages を追加

 // 外部から画像リストを更新できるようにするための関数を返す
 return { setPixelatedImages };
};
