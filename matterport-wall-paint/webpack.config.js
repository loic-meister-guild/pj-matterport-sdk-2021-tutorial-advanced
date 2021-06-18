const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'js/[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
    new CopyPlugin([
      {
        from: 'node_modules/@mp/bundle-sdk',
        to: 'bundle'
      },
      {
        from: 'node_modules/css-loader/dist/cjs.js',
        to: 'node_modules/css-loader/dist/cjs.js'
      },
      { from: 'assets', to: 'assets'}
    ]),
  ],
  devServer: {
    port: 8000,
    writeToDisk: true
  }
}