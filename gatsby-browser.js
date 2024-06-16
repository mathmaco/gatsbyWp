// normalize CSS across browsers
import "./src/css/normalize.css";
// custom CSS styles
import "./src/css/style.scss";

import React, { useEffect } from "react";
import useSound from 'use-sound';
import sound from './src/assets/se/chi.mp3';

import { MarqueeProvider } from './src/contexts/MarqueeContext';
import { TimeProvider } from "./src/contexts/TimeContext";
import { ProjectsProvider } from './src/contexts/ProjectsContext';
import { SelectedValueProvider } from './src/contexts/SelectedValueContext';
import Projects from './src/components/projects';
import Header from "./src/components/header";

const LoadSound = ({ children }) => {
 //const [play] = useSound(require('./src/assets/se/synth1.mp3'));
 const [play] = useSound(sound);
 useEffect(() => {
  // ホバーしたときに音を再生する関数
  const handleMouseEnter = () => {
   play();
  };

  // .play-soundクラスを持つすべての要素を取得
  const elements = document.querySelectorAll('.play-sound');

  // 各要素にホバーイベントリスナーを追加
  elements.forEach(element => {
   element.addEventListener('mouseenter', handleMouseEnter);
  });

  // クリーンアップ関数でイベントリスナーを削除
  return () => {
   elements.forEach(element => {
    element.removeEventListener('mouseenter', handleMouseEnter);
   });
  };
 }, [play]);

 return <>{children}</>;
};

const LoadFontScript = ({ children }) => {
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://webfont.fontplus.jp/accessor/script/fontplus.js?k9wWDE0ZkFQ%3D&box=gykzkMgsKtk%3D&aa=1&ab=2";
  script.async = true;

  script.onload = () => {
   if (window.FONTPLUS) {
    window.FONTPLUS.reload();
   }
  };

  document.head.appendChild(script);
 }, []);

 return <>{children}</>;
};

export const wrapRootElement = ({ element }) => (
 <SelectedValueProvider>
  <ProjectsProvider>
   <TimeProvider>
    <MarqueeProvider>
     <Header />
     <Projects />
     {element}
    </MarqueeProvider>
   </TimeProvider>
  </ProjectsProvider>
 </SelectedValueProvider>
);

export const wrapPageElement = ({ element }) => (
 <LoadSound>
  <LoadFontScript>
   {element}
  </LoadFontScript>
 </LoadSound>
);
