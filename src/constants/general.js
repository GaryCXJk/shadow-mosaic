const { env } = process;

const language = env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES;
const languageShort = language && language.split('_')[0];

const isDevelopment = process.env.NODE_ENV !== 'production';

export {
  language,
  languageShort,
  isDevelopment,
};
