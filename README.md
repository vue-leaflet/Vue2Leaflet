# Vue2Leaflet

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-17-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<img src="https://github.com/vue-leaflet/Vue2Leaflet/workflows/Test%20Action/badge.svg?branch=master" alt="ci">
<a href="https://www.npmjs.com/package/vue2-leaflet">
<img src="https://img.shields.io/npm/dt/vue2-leaflet.svg" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/vue2-leaflet">
<img src="https://img.shields.io/npm/v/vue2-leaflet.svg" alt="Version">
</a>
<a href="https://www.npmjs.com/package/vue2-leaflet">
<img src="https://img.shields.io/npm/l/vue2-leaflet.svg" alt="License">
</a>

Vue2Leaflet is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [Leaflet](http://leafletjs.com/) making it easy to create reactive maps.

## How to install

```bash
npm install vue2-leaflet leaflet --save
```

For more detailed information you can follow the [Quick Start Guide](https://vue2-leaflet.netlify.com/quickstart/)

## Breaking change from 1.x.x to 2.x.x

A new major release 2.0.0 is available and come with two breaking changes:

### Leaflet is not automatically installed anymore

Leaflet is now a peerDependency and need to be installed manually, we updated our docs to reflect this but please pay attention when migrating

### Importing the library in Webpack / Rollup

Now the code of vue2-leaflet is split component by component (while using a bundler like Webpack/Rollup/Parcel) to do so the following syntax is not working anymore:

```javascript
import Vue2Leaflet from 'vue2-leaflet'; // INVALID
```

And has been replaced by

```javascript
import * as Vue2Leaflet from 'vue2-leaflet'; // VALID
```

Is highly suggested to import only the needed modules by doing so:

```javascript
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
```

This will reduce the size of the bundle significantly

## Documentation

[Go here](https://vue2-leaflet.netlify.com/) to check out live examples and docs.

## Support & Community

Do you have questions? Ideas? do you want to collaborate but you feel lost? Join us on discord [Invite Link](https://discord.gg/uVZAfUf)

## Leaflet Plugins

Vue2Leaflet has a wide array of plugins written by the community! [Check Here](https://vue2-leaflet.netlify.com/plugins/)

## Contribute

```bash
# clone the repository
git clone https://github.com/vue-leaflet/Vue2Leaflet.git
cd Vue2Leaflet
# install dependencies and build vue2-leaflet
npm install
# Compile the source and start the documentation server
npm run dev
```

Go to <http://localhost:8080/> to see the docs and the examples

Any changes to the source code is reflected in the docs after a handfuls of seconds.

## Authors

- Mickaël Bouchaud
- Nicolò Maria Mezzopera

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/DonNicoJs"><img src="https://avatars3.githubusercontent.com/u/5890166?v=4" width="100px;" alt=""/><br /><sub><b>Nicolò Maria Mezzopera</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=DonNicoJs" title="Code">💻</a> <a href="#maintenance-DonNicoJs" title="Maintenance">🚧</a> <a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=DonNicoJs" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/KoRiGaN"><img src="https://avatars2.githubusercontent.com/u/924890?v=4" width="100px;" alt=""/><br /><sub><b>Mickaël</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=KoRiGaN" title="Code">💻</a> <a href="#maintenance-KoRiGaN" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/bezany"><img src="https://avatars2.githubusercontent.com/u/5105017?v=4" width="100px;" alt=""/><br /><sub><b>bezany</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=bezany" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mikeu"><img src="https://avatars3.githubusercontent.com/u/605493?v=4" width="100px;" alt=""/><br /><sub><b>Michael Underwood</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=mikeu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/byWulf"><img src="https://avatars1.githubusercontent.com/u/135651?v=4" width="100px;" alt=""/><br /><sub><b>Michael Wolf</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=byWulf" title="Code">💻</a></td>
    <td align="center"><a href="http://zuck.github.io/"><img src="https://avatars1.githubusercontent.com/u/1370938?v=4" width="100px;" alt=""/><br /><sub><b>Emanuele Bertoldi</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=zuck" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/javiertury"><img src="https://avatars3.githubusercontent.com/u/1520320?v=4" width="100px;" alt=""/><br /><sub><b>javiertury</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=javiertury" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://twitter.com/jericopulvera"><img src="https://avatars0.githubusercontent.com/u/23246308?v=4" width="100px;" alt=""/><br /><sub><b>ECO</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=jericopulvera" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/udos"><img src="https://avatars3.githubusercontent.com/u/141107?v=4" width="100px;" alt=""/><br /><sub><b>Udo Schochtert</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/issues?q=author%3Audos" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/maratumba"><img src="https://avatars2.githubusercontent.com/u/2898911?v=4" width="100px;" alt=""/><br /><sub><b>Yaman Ozakin</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/issues?q=author%3Amaratumba" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://terra-azure.org"><img src="https://avatars0.githubusercontent.com/u/682269?v=4" width="100px;" alt=""/><br /><sub><b>Andre-John Mas</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=ajmas" title="Documentation">📖</a> <a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=ajmas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/geopic"><img src="https://avatars0.githubusercontent.com/u/29524044?v=4" width="100px;" alt=""/><br /><sub><b>George Pickering</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=geopic" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Machine-Maker"><img src="https://avatars2.githubusercontent.com/u/15055071?v=4" width="100px;" alt=""/><br /><sub><b>Jake Potrebic</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=Machine-Maker" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/itanka9"><img src="https://avatars3.githubusercontent.com/u/17390418?v=4" width="100px;" alt=""/><br /><sub><b>itanka9</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=itanka9" title="Documentation">📖</a> <a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=itanka9" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/bravik"><img src="https://avatars0.githubusercontent.com/u/1075618?v=4" width="100px;" alt=""/><br /><sub><b>bravik</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=bravik" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/pgrimaud"><img src="https://avatars1.githubusercontent.com/u/1866496?v=4" width="100px;" alt=""/><br /><sub><b>Pierre Grimaud</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=pgrimaud" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andi23rosca"><img src="https://avatars2.githubusercontent.com/u/7364627?v=4" width="100px;" alt=""/><br /><sub><b>Andrei Rosca</b></sub></a><br /><a href="https://github.com/vue-leaflet/Vue2Leaflet/commits?author=andi23rosca" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

> If you believe you should be on this list please add yourself by typing this on a PR or issue: `@all-contributors please add @yourNickname for X` where X is one of [all-contributors emojoi keys](https://allcontributors.org/docs/en/emoji-key)

And all [the rest who contributed](https://github.com/vue-leaflet/Vue2Leaflet/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
