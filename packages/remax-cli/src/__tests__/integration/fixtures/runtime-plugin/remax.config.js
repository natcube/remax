const path = require('path');

const normalizePath = path => path && path.replace(/\\+/g, '/');

module.exports = {
  plugins: [
    {
      registerRuntimePlugin: () => normalizePath(path.resolve(__dirname, './runtime.js')),
    },
  ],
};
