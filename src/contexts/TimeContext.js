// src/contexts/TimeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const TimeContext = createContext(null);

export const TimeProvider = ({ children }) => {
 const [currentTime, setCurrentTime] = useState('');

 useEffect(() => {
  const timer = setInterval(() => {
   const date = new Date();
   const jstOffset = 9 * 60 * 60 * 1000;
   const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
   const jstDate = new Date(utc + jstOffset);
   const timeString = jstDate.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
   });
   const dateString = jstDate.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
   });
   setCurrentTime(`${timeString} ${dateString}`);
  }, 1000);

  return () => clearInterval(timer);
 }, []);

 return (
  <TimeContext.Provider value={currentTime}>
   {children}
  </TimeContext.Provider>
 );
};
