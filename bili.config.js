module.exports = {
  env: {
    NODE_ENV: 'production'
  },
  output: {
    extractCSS: false,
    fileName: 'vue2-leaflet.[format][min][ext]',
    format: [
      'esm',
      'cjs',
      'umd',
      'umd-min'
    ],
    moduleName: 'Vue2Leaflet'
  },
  globals: {
    'vue': 'Vue',
    'leaflet': 'leaflet'
  },
  plugins: {
    'vue': {}
  }
};
