self.onmessage = (event) => {
 const { action, interval } = event.data;

 if (action === 'start') {
  self.intervalId = setInterval(() => {
   self.postMessage('tick');
  }, interval);
 } else if (action === 'stop') {
  clearInterval(self.intervalId);
 }
};