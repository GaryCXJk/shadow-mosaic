import WindowManager from 'common/helpers/WindowManager';
import showThemes from './menu-themes';

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
