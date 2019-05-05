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
  },
];
