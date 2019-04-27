const path = require("path");

module.exports = {
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          "@": path.resolve("src"),
          leaflet: path.resolve("node_modules/leaflet"),
          "vue2-leaflet": path.resolve("../dist/vue2-leaflet.es.js")
        }
      }
    };
  },

  publicPath: '',
  outputDir: '../docs/examples',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
