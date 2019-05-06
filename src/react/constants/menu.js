import ConfigManager from '@helpers/ConfigManager';
import WindowManager from '@helpers/WindowManager';
import * as themes from '@themes';

const showThemes = () => {
  const items = [];

  console.log(ConfigManager.getStore());

  Object.keys(themes).forEach((themeKey) => {
    const theme = themes[themeKey];
    const item = {
      id: theme.nameId,
      defaultMessage: theme.name,
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
            hideDevtools: true,
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
