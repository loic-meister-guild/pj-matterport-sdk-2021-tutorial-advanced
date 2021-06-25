const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'app-cursor.js',
      path: path.resolve(__dirname, '../public/js'),
    },
    plugins: [
    ],
      
  };