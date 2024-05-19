// src/scrollWorker.js
/* eslint-disable no-restricted-globals */
let scrollSpeed = 30; // スクロール間隔（ミリ秒）
let scrollDistance = 1; // 1回のスクロールで移動する距離（ピクセル）

self.onmessage = function (event) {
 const { action, speed, distance } = event.data;

 if (action === 'start') {
  scrollSpeed = speed || scrollSpeed;
  scrollDistance = distance || scrollDistance;
  startScrolling();
 } else if (action === 'stop') {
  stopScrolling();
 }
};

let intervalId;

function startScrolling() {
 intervalId = setInterval(() => {
  self.postMessage('scroll');
 }, scrollSpeed);
}

function stopScrolling() {
 clearInterval(intervalId);
}
