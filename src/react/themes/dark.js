import defaultTheme from './default';

const merge = require('deepmerge');

export default merge(defaultTheme, {
  backgroundColor: '#353C51',
  textColor: '#fff',
  menu: {
    backgroundColor: '#2b3142',
    dropdown: {
      borderColor: '#3f4861',
    },
    item: {
      hover: {
        backgroundColor: '#212633',
      },
      focus: {
        backgroundColor: '#353c51',
      },
    },
  },
  button: {
    textColor: '#fff',
    backgroundColor: '#2b3142',
    hover: {
      backgroundColor: '#212633',
    },
    focus: {
      backgroundColor: '#353c51',
    },
  },
});
