// MarqueeContext.js
import React, { createContext, useContext, useState } from 'react';

const MarqueeContext = createContext({
 marqueeData: { media: [], speed: 0 }, // 初期値として空のmedia配列とspeedを設定
 updateMarqueeData: () => { }
});

export const useMarquee = () => useContext(MarqueeContext);

export const MarqueeProvider = ({ children }) => {
 const [marqueeData, setMarqueeData] = useState({ media: [], speed: 0 });

 const updateMarqueeData = (data) => {
  setMarqueeData(data);
 };

 return (
  <MarqueeContext.Provider value={{ marqueeData, updateMarqueeData }}>
   {children}
  </MarqueeContext.Provider>
 );
};
