# Vue2Leaflet

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
<a href="https://coveralls.io/github/KoRiGaN/Vue2Leaflet?branch=master">
<img src="https://coveralls.io/repos/github/KoRiGaN/Vue2Leaflet/badge.svg?branch=master)" alt="License">
</a>

Vue2Leaflet is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [Leaflet](http://leafletjs.com/) making it easy to create reactive maps.

## How to install

```bash
npm install vue2-leaflet leaflet --save
```

For more detailed information you can follow the [Quick Start Guide](https://vue-leaflet.github.io/Vue2Leaflet/quickstart/)

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

[Go here](https://vue-leaflet.github.io/Vue2Leaflet) to check out live examples and docs.

## Leaflet Plugins

Vue2Leaflet has a wide array of plugins written by the community! [Check Here](https://vue-leaflet.github.io/Vue2Leaflet/plugins/)

## Contribute

```bash
# clone the repository
git clone https://github.com/KoRiGaN/Vue2Leaflet.git
cd Vue2Leaflet
# install dependencies and build vue2-leaflet
npm install
# create a symlink for vue2-leaflet
yarn link
cd examples
yarn install
# create a symbolic link for vue2-leaflet in node_modules/
yarn link vue2-leaflet
# serve with hot reload at localhost:8080
yarn run serve
```

Go to <http://localhost:8080/> to see running examples

NOTE: If you make changes to the library you should run 'npm run build' again in the root folder.
The dev server should detect modification and reload the examples

## Authors

- Mickaël Bouchaud
- Nicolò Maria Mezzopera

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these [wonderful people](https://github.com/KoRiGaN/Vue2Leaflet/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
