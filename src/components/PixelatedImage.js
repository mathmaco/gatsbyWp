import React, { useEffect, useState } from 'react';
import { pixelateImage } from '../utils/pixelateImage';
import { GatsbyImage } from 'gatsby-plugin-image';

const PixelatedImage = ({ image, altText }) => {
 const [pixelatedSrc, setPixelatedSrc] = useState(null);

 useEffect(() => {
  pixelateImage(image.images.fallback.src, 100, (pixelatedDataUrl) => {
   setPixelatedSrc(pixelatedDataUrl);
  });
 }, [image]);

 return (
  <div className="image-container" style={{ position: 'relative' }}>
   {pixelatedSrc && (
    <img
     src={pixelatedSrc}
     alt={altText || 'Pixelated Image'}
     className="pixelated-image"
     style={{ width: '100%', height: '100%' }}
    />
   )}
   <div
    className="normal-image"
    style={{
     width: '100%',
     height: '100%',
     opacity: pixelatedSrc ? 1 : 0,
     position: 'absolute',
     top: 0,
     left: 0,
     transition: 'opacity 1.5s ease-in-out',
    }}
   >
    {/*<GatsbyImage image={image} alt={altText || 'Normal Image'} />*/}
   </div>
  </div>
 );
};

export default PixelatedImage;
