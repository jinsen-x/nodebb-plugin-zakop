'use strict';

const path = require('path');

module.exports = function sanitize(content) {
  // usuń markdown obrazków
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images = [];

  let text = content.replace(imageRegex, (_, url) => {
    const filename = path.basename(url.split('?')[0]);
    images.push(decodeURIComponent(filename));
    return '';
  });

  // todo: image
  text = text
    .replace("\n", " ")
    .replace(/#\w+/g, '')
    .replace(/[ąĄ]/g, 'a')
    .replace(/[ćĆ]/g, 'c')
    .replace(/[ęĘ]/g, 'e')
    .replace(/[łŁ]/g, 'l')
    .replace(/[ńŃ]/g, 'n')
    .replace(/[óÓ]/g, 'o')
    .replace(/[śŚ]/g, 's')
    .replace(/[źŹżŻ]/g, 'z')
    .replace(/[^a-zA-Z0-9\s_\-.]/g, '')
    .replace(/\s+/g, " ")
    .trim();

  return {
    text,
    images
  };
};
