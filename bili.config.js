module.exports = {
  env: {
    NODE_ENV: 'production'
  },
  format: [
    'es',
    'umd',
    'umd-min'
  ],
  global: {
    'vue': 'Vue',
    'leaflet': 'leaflet'
  },
  jsx: 'vue',
  moduleName: 'Vue2Leaflet',
  plugin: [
    'vue'
  ],
  vue: {},
  postcss: {
    extract: false
  }
};
