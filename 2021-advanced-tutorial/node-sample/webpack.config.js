const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'app-node.js',
      path: path.resolve(__dirname, '../public/js'),
    },
    plugins: [
    ],
      
  };