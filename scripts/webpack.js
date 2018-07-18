const path = require('path');
const webpack = require('webpack');

const config = module.exports = {
  plugins: []
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Client entry
config.entry = {
  Vue2Leaflet: path.resolve(__dirname, '../src/main')
};

// Basic output config
config.output = {
  path: path.resolve(__dirname, '../dist'),
  filename: 'vue2-leaflet.js',
  library: ['Vue2Leaflet'],
  libraryTarget: 'umd'
};

config.externals = [{
  'leaflet': {
    umd: 'L',
    root: 'L',
    global: 'L',
    commonjs2: 'leaflet',
    commonjs: 'leaflet',
    amd: 'leaflet'
  },
  'vue': {
    umd: 'Vue',
    global: 'Vue',
    root: 'Vue',
    commonjs2: 'vue',
    commonjs: 'vue',
    amd: 'vue'
  }
}];
// Resolver config
config.resolve = {
  extensions: ['.js', '.vue'],
  enforceExtension: false
};

config.resolveLoader = {
  modules: config.resolve.modules
};

config.mode = 'production';

config.module = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      // important: exclude files in node_modules, otherwise it's going to be really slow!
      exclude: /node_modules|vendor/
    }
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = 'vue2-leaflet.min.js';
  config.devtool = '#source-map';
} else {
  config.devtool = '#eval-source-map';
}
