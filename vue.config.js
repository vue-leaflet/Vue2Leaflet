module.exports = {
  css: {
    extract: false
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
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
      }
    };
  }
};
