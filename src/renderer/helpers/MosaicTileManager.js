// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import { format as formatUrl } from 'url';

const validEncoding = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

/**
 * @typeof {Object} TileOptions The options for creating a tile.
 * @property {String} file The file to generate the tile from.
 * @property {number} width The width of the tile.
 * @property {number} height The height of the tile.
 */

/**
 * This helper class will help in creating and analyzing tiles.
 */
class MosaicTileManager {
  /**
   * Creates a tile from a select image.
   * @param {TileOptions} options The {@link TileOptions}.
   */
  static createTile({
    file,
    width,
    height,
    mode = 'cover',
    encoding = 'image/png',
  }) {
    // Check if the provided encoding is valid.
    if (!validEncoding[encoding]) {
      return Promise.reject();
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = formatUrl({
      pathname: file,
      protocol: 'file',
      slashes: true,
    });

    return new Promise((resolve, reject) => {
      image.onerror = reject;
      image.onload = () => {
        const imgWidth = image.naturalWidth;
        const imgHeight = image.naturalHeight;

        const ratio = width / height;
        const imgRatio = imgWidth / imgHeight;

        switch (mode) {
          case 'stretch':
            context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height);
            break;
          case 'cover':
          default: {
            if (imgRatio === ratio) {
              context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height);
              break;
            }
            const clipDir = imgRatio > ratio;
            const clipWidth = clipDir ? imgHeight * ratio : imgWidth;
            const clipHeight = clipDir ? imgHeight : imgWidth * (height / width);
            const clipX = (imgWidth - clipWidth) / 2;
            const clipY = (imgHeight - clipHeight) / 2;
            context.drawImage(image, clipX, clipY, clipWidth, clipHeight, 0, 0, width, height);
            break;
          }
        }

        const imgString = canvas.toDataURL(encoding);
        const timestamp = (new Date()).getTime();
        const imgData = imgString.split(';base64,').pop();

        const imgName = `${remote.app.getName()}-${timestamp}.${validEncoding[encoding]}`;

        const imgOut = path.resolve(remote.app.getPath('temp'), imgName);

        fs.writeFile(imgOut, imgData, {
          encoding: 'base64',
        }, (err) => {
          if (err) {
            reject(err);
          }
          const colors = this.getColors(image);
          resolve({
            thumb: imgOut,
            colors,
          });
        });
      };
    });
  }

  static getColors(canvas, x = 0, y = 0, width = 0, height = 0) {
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 1;
    testCanvas.height = 1;
    const context = testCanvas.getContext('2d');
    const realWidth = (width || canvas.width) - x;
    const realHeight = (height || canvas.height) - y;
    const colors = [];
    for (let posY = 0; posY < 2; posY += 1) {
      for (let posX = 0; posX < 2; posX += 1) {
        const sourceX = Math.floor(posX * (realWidth / 2));
        const sourceY = Math.floor(posY * (realHeight / 2));
        const sourceWidth = Math.floor((posX + 1) * (realWidth / 2)) - sourceX;
        const sourceHeight = Math.floor((posY + 1) * (realWidth / 2)) - sourceY;
        context.drawImage(canvas, sourceX + x, sourceY + y, sourceWidth, sourceHeight, 0, 0, 1, 1);
        const color = context.getImageData(0, 0, 1, 1).data;
        colors.push(color.slice(0, 3));
      }
    }
    return colors;
  }
}

export default MosaicTileManager;
