const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.join(__dirname, './../');
const PRESETS = ['es2015', 'stage-0', 'react'];
const PLUGINS = [
  'add-module-exports',
  'transform-decorators-legacy'
];

module.exports = {
  entry: {
    // After webpack transpiles, this file will become `backgound.js`
    background: path.join(ROOT, 'background/index.js'),
    // After webpack transpiles, this file will become `content.js`
    content: path.join(ROOT, 'content/index.js')
  },
  output: {
    // `[name].js` makes sure that every key in the webpack config's `entry` becomes
    // a seperate file in the output, with the name of the file being the key name,
    // See: http://stackoverflow.com/questions/31907672/how-to-set-multiple-file-entry-and-output-in-project-with-webpack
    filename: '[name].js',
    // This is where the assets are physically written on disk
    path: path.join(ROOT, '../build'),
    // This is where the assets are served up. In our case, just the root directory
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss']
  },
  plugins: [
    // Extracts all the styles into a single `style.css` file served at the `publicPath`
    new ExtractTextPlugin('style.css', {allChunks: true}),
    // Polyfills `fetch`
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: PRESETS,
          plugins: PLUGINS
        }
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }, {
        test: /.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
      }, {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ],
    noParse: /\.min\.js/
  }
};
