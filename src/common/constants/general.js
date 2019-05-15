const { env } = process;

const language = env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES;
const languageShort = language && language.split('_')[0];

const isDevelopment = process.env.NODE_ENV !== 'production';

const validEncoding = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

const validFiles = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
};

export {
  language,
  languageShort,
  isDevelopment,
  validEncoding,
  validFiles,
};
