import React, { createContext, useState, useContext, useEffect } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
 const [animationProgress, setAnimationProgress] = useState(
  () => parseFloat(localStorage.getItem('animationProgress')) || 0
 );

 useEffect(() => {
  localStorage.setItem('animationProgress', animationProgress);
 }, [animationProgress]);

 return (
  <AnimationContext.Provider value={{ animationProgress, setAnimationProgress }}>
   {children}
  </AnimationContext.Provider>
 );
};

export const useAnimation = () => {
 const context = useContext(AnimationContext);
 if (context === undefined) {
  throw new Error('useAnimation must be used within an AnimationProvider');
 }
 return context;
};
