// eslint-disable-next-line import/no-extraneous-dependencies
import WindowManager from '../helpers/WindowManager';

export default [
  {
    id: 'file',
    defaultMessage: 'File',
    options: [
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
