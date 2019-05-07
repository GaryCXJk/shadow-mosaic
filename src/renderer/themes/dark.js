import defaultTheme from './default';

const merge = require('deepmerge');

export default merge(defaultTheme, {
  name: 'Dark',
  nameId: 'theme.dark',
  backgroundColor: '#353C51',
  textColor: '#fff',
  borderColor: '#3f4861',
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
  fieldset: {
    borderColor: '#fff',
  },
  form: {
    input: {
      textColor: '#fff',
      backgroundColor: '#3f4760',
      borderColor: '#535d7e',
      hover: {
        backgroundColor: '#49526f',
      },
      focus: {
        backgroundColor: '#353c51',
      },
    },
  },
});
