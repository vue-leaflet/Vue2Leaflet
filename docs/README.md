# Vue2Leaflet {docsify-ignore}

<img align="right" height="178" title="Vue2Leaflet Limit logo" src="./logo.png">

<a href="https://travis-ci.org/KoRiGaN/Vue2Leaflet">
  <img src="https://travis-ci.org/KoRiGaN/Vue2Leaflet.svg?branch=master" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/vue2-leaflet">
  <img src="https://img.shields.io/npm/dt/vue2-leaflet.svg" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/vue2-leaflet">
  <img src="https://img.shields.io/npm/v/vue2-leaflet.svg" alt="Version">
</a>
<a href="https://www.npmjs.com/package/vue2-leaflet">
  <img src="https://img.shields.io/npm/l/vue2-leaflet.svg" alt="License">
</a>
<a href="https://gitter.im/Vue2Leaflet/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
  <img src="https://badges.gitter.im/Vue2Leaflet/Lobby.svg" alt="Gitter">
</a>

Vue2Leaflet is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [Leaflet](http://leafletjs.com/) making it easy to create reactive maps.


![Image of Map](./vue2leaflet-example.png)

## How to install

``` bash
$ npm install vue2-leaflet --save
```
For more detailed informations you can follow the [Quick Start Guide](https://korigan.github.io/Vue2Leaflet/)


## Breaking changes from v0.x.x to v1.x.x

A new major release v1.x.x is available and come with some breaking changes.

### Components names

As some component where conflicting with reserved name like Circle with SVG Circle, from v1.x.x all components are prefixed with L.
For example Marker component became LMarker (l-marker in template).

### Events names

Event handling have been simplified and are now mapped directly to Leaflet event.
For example Marker move event was 'l-move' and became simply 'move'.

### Leaflet Controls

v1.0.0 introduces Leaflet Controls you can now use them using LControlAttribution, LControlLayers, LControlScale and LControlZoom.

When adding LControlAttribution or LControlZoom to your template, remember to desactivate the default one by using LMap options:

``` js
{
  zoomControl: false,
  attributionControl: false
}
```

Otherwise you will end up with two zoom/attribution control.


## Contribute
``` bash
# clone the repository
$ git clone git@github.com:KoRiGaN/Vue2Leaflet.git
$ cd Vue2Leaflet
# install dependencies and build vue2-leaflet
$ npm install
$ npm run build
# create a symlink for vue2-leaflet
$ npm link
$ cd examples
$ npm install
# create a symbolic link for vue2-leaflet in node_modules/
$ npm link vue2-leaflet
# serve with hot reload at localhost:8080
$ npm run dev
```
Go to <http://localhost:8080/> to see running examples

NOTE: If you make changes to the library you should run 'npm run build' again in the root folder.
The dev server should detect modification and reload the examples

## Authors

Mickaël Bouchaud

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these [wonderful people](https://github.com/KoRiGaN/Vue2Leaflet/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

