module.exports = {
  env: {
    NODE_ENV: 'production'
  },
  output: {
    extractCSS: false,
    fileName: 'vue2-leaflet.[format][min].js',
    format: [
      'esm',
      'cjs',
      'umd',
      'umd-min'
    ],
    moduleName: 'Vue2Leaflet'
  },
  externals: ['vue', 'leaflet'],
  globals: {
    'vue': 'Vue',
    'leaflet': 'leaflet'
  },
  plugins: {
    'node-resolve': {
      jsnext: true,
      main: true
    },
    'commonjs': {},
    'vue': {}
  }
};
