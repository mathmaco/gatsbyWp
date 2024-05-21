// utils/getVimeoThumbnail.js
export const getVimeoThumbnail = async (videoId) => {
 const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
 const data = await response.json();
 return data[0].thumbnail_large; // サムネイルのURLを返す
};