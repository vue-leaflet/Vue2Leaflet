const path = require('path');

module.exports = {
  title: 'Vue Leaflet docs',
  description: 'Documentations, API, and FAQ for vue leaflet',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  plugins: [['demo-code']],
  configureWebpack: {
    resolve: {
      alias: {
        'vue2-leaflet': '../../src/index.js',
        vue: 'vue/dist/vue.common.js',
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
      { text: 'FAQ', link: '/faq/' },
    ],
  },
};
