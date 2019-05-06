import React from 'react';
import { FiCheck } from 'react-icons/fi';
import configureStore from '@store';
import { CONFIG_SET_THEME } from '@store/actions/config';
import * as themes from '@themes';

const showThemes = () => {
  const items = [];

  const store = configureStore();
  const state = store.getState();
  const { config } = state;
  const currentTheme = config.theme;

  Object.keys(themes).forEach((themeKey) => {
    const theme = themes[themeKey];
    const item = {
      id: theme.nameId,
      defaultMessage: theme.name,
      icon: currentTheme === themeKey ? <FiCheck /> : true,
      action: () => {
        store.dispatch({
          type: CONFIG_SET_THEME,
          theme: themeKey,
        });
      },
    };
    items.push(item);
  });
  return items;
};

export default showThemes;
