// utils/base64ToImage.js
const fs = require('fs');
const path = require('path');

function base64ToImage(base64String, fileName) {
  // Menghilangkan bagian header dari base64 string
  const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const imageBuffer = Buffer.from(matches[2], 'base64');
  const filePath = path.join(__dirname, '..', 'images', fileName);

  // Menyimpan gambar ke disk
  fs.writeFileSync(filePath, imageBuffer);
  return filePath;
}

module.exports = base64ToImage;
