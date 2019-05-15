import fs from 'fs';
import { validFiles } from 'common/constants/general';
import MosaicTileManager from './MosaicTileManager';

const defaultMultiplier = [0.650, 0.794, 0.557];

/**
 * Compares an input color to the destination color.
 * @param {Array} sourceColors The color candidate that gets compared to the colors from the source
 * @param {Array} destinationColors The source colors
 * @param {Array} colorMultiplier The multiplier for each color value
 */
const compareColors = (sourceColors, destinationColors, colorMultiplier = defaultMultiplier) => {
  let value = 0;
  for (let colorIndex = 0; colorIndex < sourceColors.length; colorIndex += 1) {
    for (let index = 0; index < 3; index += 1) {
      const sourceVal = sourceColors[colorIndex][index];
      const destVal = destinationColors[colorIndex][index];
      const multiplier = colorMultiplier[index];

      value += ((destVal - sourceVal) * multiplier) ** 2;
    }
  }
  return Math.sqrt(value);
};

/**
 * A helper class that helps simplify generating mosaic images.
 */
class MosaicImage {
  constructor() {
    this.file = null;
    this.width = 0;
    this.height = 0;
    this.precision = 2;
    this.spread = 0;
    this.data = [];
    this.tilemap = [];
  }

  load(file) {
    this.file = file;
    this.image = new Image();
    this.image.src = this.file;
    return new Promise((resolve, reject) => {
      this.image.onerror = () => {
        reject();
      };
      this.image.onload = () => {
        this.width = this.width || this.image.naturalWidth;
        this.height = this.height || this.image.naturalHeight;
        resolve(this);
      };
    });
  }

  reset() {
    this.data.splice(0);
    this.tilemap.splice(0);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  setPrecision(precision) {
    this.precision = precision;
    this.reset();
  }

  setSpread(spread) {
    this.spread = spread;
    this.reset();
  }

  analyzeImage(withPromise = false) {
    if (withPromise) {
      return new Promise((resolve) => {
        const res = this.analyzeImage();
        resolve(res);
      });
    }
    this.reset();
    const realWidth = this.image.naturalWidth;
    const realHeight = this.image.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(this.width, realWidth);
    canvas.height = Math.max(this.height, realHeight);
    const context = canvas.getContext('2d');
    context.drawImage(
      this.image,
      0,
      0,
      realWidth,
      realHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const sourceX = Math.floor(x * (canvas.width / this.width));
        const sourceY = Math.floor(y * (canvas.height / this.height));
        const sourceWidth = Math.floor((x + 1) * (canvas.width / this.width)) - sourceX;
        const sourceHeight = Math.floor((y + 1) * (canvas.height / this.height)) - sourceY;
        const colorData = MosaicTileManager.getColors(canvas, {
          x: sourceX,
          y: sourceY,
          width: sourceWidth,
          height: sourceHeight,
          precision: this.precision,
          spread: this.spread,
        });
        this.data.push(colorData);
      }
    }
    return this.data;
  }

  getTilemap(tiles, {
    distance = 2,
    colorMultiplier = defaultMultiplier,
  }, onUpdate = null) {
    const { width, tilemap } = this;
    tilemap.splice(0);

    if (this.data.length === 0) {
      this.analyzeImage();
    }

    this.data.forEach((colors, index) => {
      const candidates = tiles.map((_value, candidateIndex) => candidateIndex);
      candidates.sort((indexA, indexB) => {
        const colorsA = tiles[indexA].colors;
        const colorsB = tiles[indexB].colors;
        const valA = compareColors(colorsA, colors, colorMultiplier);
        const valB = compareColors(colorsB, colors, colorMultiplier);
        return valB - valA;
      });

      let colorIndex = 0;
      let usable = false;

      while (colorIndex < candidates.length && !usable) {
        usable = true;
        for (let y = -distance; y <= distance; y += 1) {
          for (let x = -distance; x <= distance; x += 1) {
            if (x !== 0 || y !== 0) {
              const compareIndex = index + x + y * width;
              if (
                compareIndex >= 0
                && compareIndex < tilemap.length
                && typeof tilemap[compareIndex] !== 'undefined'
                && tilemap[compareIndex] === candidates[colorIndex]) {
                colorIndex += 1;
                usable = false;
              }
            }
          }
        }
      }

      if (!usable) {
        colorIndex = 0;
      }
      this.tilemap[index] = candidates[colorIndex];
      if (onUpdate) {
        onUpdate({
          index,
          total: this.data.length,
        });
      }
    });

    return this.tilemap;
  }

  toImage(file, tiles, tileWidth, tileHeight) {
    const extension = file.split('.').pop();
    if (!validFiles[extension]) {
      return Promise.reject();
    }
    const encoding = validFiles[extension];

    const canvasWidth = tileWidth * this.width;
    const canvasHeight = tileHeight * this.height;
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');

    const promises = [];
    const tilesProcessed = [];

    this.tilemap.forEach((cell) => {
      if (!tilesProcessed.includes(cell)) {
        const promise = new Promise(
          this.setTilePromise.bind(this, tiles, cell, tileWidth, tileHeight, context),
        );
        promises.push(promise);
        tilesProcessed.push(cell);
      }
    });

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(() => {
        const imgString = canvas.toDataURL(encoding);
        const imgData = imgString.split(';base64,').pop();

        fs.writeFile(file, imgData, {
          encoding: 'base64',
        }, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  setTileToImagePromise(tiles, cell, tileWidth, tileHeight, context, resolve, reject) {
    const { tilemap, width } = this;

    const image = new Image();
    image.src = tiles[cell];
    image.onerror = reject;
    image.onload = () => {
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      tilemap.forEach((tile, index) => {
        if (tile === cell) {
          const x = (index % width) * tileWidth;
          const y = Math.floor(index / width) * tileHeight;
          context.drawImage(0, 0, imageWidth, imageHeight, x, y, tileWidth, tileHeight);
        }
      });
      resolve();
    };
  }
}

class MosaicImageHelper {
  static loadImage(file, width = 0, height = 0) {
    const image = new MosaicImage();
    image.setSize(width, height);
    return image.load(file);
  }
}

export default MosaicImageHelper;
