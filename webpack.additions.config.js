const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      common: path.resolve(__dirname, 'src/common'),
      '@store': path.resolve(__dirname, 'src/common/store'),
      '@components': path.resolve(__dirname, 'src/react/components'),
      '@elements': path.resolve(__dirname, 'src/react/components/elements'),
      '@layout': path.resolve(__dirname, 'src/react/components/layout'),
      '@pages': path.resolve(__dirname, 'src/react/components/pages'),
      '@containers': path.resolve(__dirname, 'src/react/containers'),
      '@constants': path.resolve(__dirname, 'src/react/constants'),
      '@helpers': path.resolve(__dirname, 'src/react/helpers'),
      '@themes': path.resolve(__dirname, 'src/react/themes'),
    },
  },
};
