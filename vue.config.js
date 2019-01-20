module.exports = {
  css: {
    extract: false
  },
  configureWebpack: config => {
    if (config.output.libraryTarget === 'umd') {
      config.output.umdNamedDefine = true;
      config.output.library = 'Vue2Leaflet';
    }
    config.externals = {
      ...config.externals,
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
    };
  }
};
