// src/scrollWorker.js
/* eslint-disable no-restricted-globals */
let scrollInterval;
let speed = 30;
let distance = 10;

self.onmessage = function (event) {
 const { action, speed: newSpeed, distance: newDistance } = event.data;

 if (action === 'start') {
  if (newSpeed !== undefined) speed = newSpeed;
  if (newDistance !== undefined) distance = newDistance;
  scrollInterval = setInterval(() => {
   self.postMessage('scroll');
  }, speed);
 } else if (action === 'stop') {
  clearInterval(scrollInterval);
 }
};
