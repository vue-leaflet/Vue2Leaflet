const path = require('path');

module.exports = {
  title: 'Vue Leaflet docs',
  description: 'Documentations, API, and FAQ for vue leaflet',
  plugins: [['demo-code']],
  configureWebpack: {
    resolve: {
      alias: {
        'vue2-leaflet': '../../src/index.js',
      },
    },
  },
  themeConfig: {
    // displayAllHeaders: true, // Default: false
    sidebar: 'auto',
    nav: [
      { text: 'Intro', link: '/' },
      { text: 'Quickstart', link: '/quickstart/' },
      { text: 'Components', link: '/components/' },
      { text: 'Mixins', link: '/mixins/' },
      { text: 'FAQ', link: '/faq/' },
    ],
  },
};
