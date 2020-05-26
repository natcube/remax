const path = require('path');

module.exports = {
  plugins: [
    {
      registerRuntimePlugin: () => path.resolve(__dirname, './runtime.js'),
    },
  ],
};
