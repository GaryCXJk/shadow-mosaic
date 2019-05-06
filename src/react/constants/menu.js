import React from 'react';
import { FiCheck } from 'react-icons/fi';
import configureStore from '@store';
import { CONFIG_SET_THEME } from '@store/actions/config';
import WindowManager from '@helpers/WindowManager';
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

export default [
  {
    id: 'file',
    defaultMessage: 'File',
    options: [
      {
        id: 'settings',
        defaultMessage: 'Settings',
        action: () => {
          WindowManager.create('settings', {
            parent: 'main',
            location: '/settings',
          });
        },
      },
      {
        type: 'divider',
      },
      {
        id: 'exit',
        defaultMessage: 'Exit',
        action: () => {
          WindowManager.get('main').close();
        },
      },
    ],
  },
  {
    id: 'theme',
    defaultMessage: 'Theme',
    options: showThemes,
  },
  {
    id: 'help',
    defaultMessage: 'Help',
    options: [
      {
        id: 'about',
        defaultMessage: 'About',
        action: () => {
          WindowManager.create('about', {
            modalParent: 'main',
            location: '/about',
            width: 320,
            height: 500,
            hideDevtools: true,
            resizable: false,
          });
        },
      },
    ],
  },
];
