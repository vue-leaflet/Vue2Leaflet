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
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  plugins: [
    [
      'demo-code',
      {
        cssLibs: ['https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'],
        onlineBtns: { codesandbox: true, codepen: false, jsfiddle: false },
        codesandbox: {
          deps: { leaflet: 'latest', 'vue2-leaflet': '2.5.3', vue: '2.6.11' },
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
  extendCli(cli) {
    cli
      .command('buildnossr [targetDir]', 'Build without ssr')
      .action(async (sourceDir = '.', commandOptions) => {
        const { path } = require('@vuepress/shared-utils');
        const CopyPlugin = require('copy-webpack-plugin');
        const fs = require('fs');
        const App = require('@vuepress/core/lib/node/App');
        const DevProcess = require('@vuepress/core/lib/node/dev');
        const webpack = require('webpack');

        const app = new App({
          sourceDir: path.resolve(sourceDir),
          ...{ theme: '@vuepress/default' },
          ...commandOptions,
        });
        await app.process();
        app.resolveCacheLoaderOptions();

        const devProcess = new DevProcess(app);
        devProcess.prepareWebpackConfig();

        const publicDir = path.resolve(sourceDir, '.vuepress/public');
        const { outDir } = app;
        if (fs.existsSync(publicDir)) {
          devProcess.webpackConfig.plugins.push(
            new CopyPlugin([{ from: publicDir, to: outDir }])
          );
        }
        await new Promise((resolve, reject) => {
          webpack(devProcess.webpackConfig, (err, stats) => {
            if (err) {
              return reject(err);
            }
            resolve(stats.toJson({ modules: false }));
          });
        });
      });
  },
};
