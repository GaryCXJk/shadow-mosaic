class StyleHelper {
  static convertStyleAttribute(style) {
    if (!style) {
      return '';
    }
    return Object.keys(style).reduce((css, key) => (`
      ${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${style[key]};
    `), '');
  }
}

export default StyleHelper;
