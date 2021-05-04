const path = require('path');

module.exports = {
  plugins: [
    path.resolve('./plugins/jsx-dansform'),
    path.resolve('./plugins/jsx-syntax-parser'),
  ],
};
