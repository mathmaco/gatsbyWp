// src/components/VimeoPlayer.js
import React from 'react';
import ReactPlayer from 'react-player';

const VimeoPlayer = ({ url }) => {
 return (
  <div className="player-wrapper">
   <ReactPlayer
    url={url}
    config={{
     vimeo: {
      playerOptions: {
       controls: false,
       autoplay: true,
       background: true,
       byline: false,
       loop: true,
       responsive: true
      }
     }
    }}
    width="100%"
    height="100%"
    className="react-player"
   />
  </div>
 );
};

export default VimeoPlayer;