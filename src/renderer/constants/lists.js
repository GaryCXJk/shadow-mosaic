import * as themesMap from '@themes';
import locales from '../locale';

const themes = Object.keys(themesMap).map((themeName) => {
  const theme = themesMap[themeName];
  return {
    value: themeName,
    messageId: theme.nameId,
    defaultMessage: theme.name,
  };
});

const languages = Object.keys(locales).map((languageId) => {
  const language = locales[languageId];
  const messageId = `language.${languageId}`;
  return {
    value: languageId,
    messageId,
    defaultMessage: language[messageId],
  };
});

export {
  themes,
  languages,
};
