const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      common: path.resolve(__dirname, 'src/common'),
      '@store': path.resolve(__dirname, 'src/renderer/store'),
      '@components': path.resolve(__dirname, 'src/renderer/components'),
      '@elements': path.resolve(__dirname, 'src/renderer/components/elements'),
      '@layout': path.resolve(__dirname, 'src/renderer/components/layout'),
      '@pages': path.resolve(__dirname, 'src/renderer/components/pages'),
      '@containers': path.resolve(__dirname, 'src/renderer/containers'),
      '@hoc': path.resolve(__dirname, 'src/renderer/containers/hoc'),
      '@constants': path.resolve(__dirname, 'src/renderer/constants'),
      '@helpers': path.resolve(__dirname, 'src/renderer/helpers'),
      '@themes': path.resolve(__dirname, 'src/renderer/themes'),
    },
  },
};
