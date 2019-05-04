// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';

export default [
  {
    id: 'file',
    defaultMessage: 'File',
    options: [
      {
        id: 'exit',
        defaultMessage: 'Exit',
        action: () => {
          remote.getCurrentWindow().close();
        },
      },
    ],
  },
  {
    id: 'help',
    defaultMessage: 'Help',
  },
];
