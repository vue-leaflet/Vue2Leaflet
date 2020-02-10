const path = require('path');
const fs = require('fs');
const componentsFolder = path.join(__dirname, '../components/');
const examplesFolder = path.join(__dirname, '../examples/');

const components = fs
  .readdirSync(componentsFolder)
  .filter(c => c !== 'README.md');

const examples = fs.readdirSync(examplesFolder).filter(c => c !== 'README.md');

module.exports = {
  title: 'Vue Leaflet',
  description: 'Documentations, API, and FAQ for vue leaflet',
  base: '/Vue2Leaflet',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  plugins: [
    [
      'demo-code',
      {
        cssLibs: ['https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'],
        onlineBtns: { codesandbox: true, codepen: false, jsfiddle: false },
        codesandbox: {
          deps: { leaflet: 'latest', 'vue2-leaflet': 'latest' },
          json: '',
          query: '',
          embed: '',
        },
      },
    ],
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), {
        root: './docs/',
        includeRe: /<\[include\]\((.+)\)/i,
      });
    },
  },
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
    // sidebar: 'auto',
    sidebar: {
      '/components/': components,
      '/examples/': examples,
    },
    nav: [
      { text: 'Intro', link: '/' },
      { text: 'Quickstart', link: '/quickstart/' },
      { text: 'Components', link: '/components/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'Plugins', link: '/plugins/' },
    ],
  },
};
