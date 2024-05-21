// utils/pixelateImage.js
export const pixelateImage = (imageSrc, pixelSize = 10, callback) => {
 const img = new Image();
 img.crossOrigin = 'Anonymous'; // CORS問題を回避するため

 img.onload = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  // 画像を描画
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // ピクセル化
  for (let y = 0; y < img.height; y += pixelSize) {
   for (let x = 0; x < img.width; x += pixelSize) {
    const pixel = ctx.getImageData(x, y, pixelSize, pixelSize);
    const avgColor = getAverageColor(pixel.data);
    ctx.fillStyle = `rgb(${avgColor.r},${avgColor.g},${avgColor.b})`;
    ctx.fillRect(x, y, pixelSize, pixelSize);
   }
  }

  // コールバックでピクセル化した画像を返す
  callback(canvas.toDataURL());
 };

 img.src = imageSrc;
};

const getAverageColor = (data) => {
 let r = 0, g = 0, b = 0, count = 0;
 for (let i = 0; i < data.length; i += 4) {
  r += data[i];
  g += data[i + 1];
  b += data[i + 2];
  count++;
 }
 return { r: r / count, g: g / count, b: b / count };
};
