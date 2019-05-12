// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import { format as formatUrl } from 'url';

const validEncoding = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
};

class MosaicTileManager {
  static createTile(options) {
    const {
      file,
      width,
      height,
      mode = 'cover',
      encoding = 'image/png',
    } = options;

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
          resolve(imgOut);
        });
      };
    });
  }

  static getColors() {
    const canvas = document.createElement('canvas');
    canvas.getContext('2d');
  }
}

export default MosaicTileManager;
