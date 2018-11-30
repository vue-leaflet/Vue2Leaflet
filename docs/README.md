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

## FAQ
#### My map and/or markers don't fully render. What gives?
Depending on your project setup, you may have to try different solutions.

To fix map rendering issues, it may help to [import the Leaflet stylesheet within the **script** section of your Vue component](https://github.com/KoRiGaN/Vue2Leaflet/issues/157#issuecomment-384307765).

In most cases, though, it is Webpack messing with Leaflet marker icons' paths, resulting in warnings or even errors. You can alleviate that by either [unsetting/replacing the default paths](https://github.com/KoRiGaN/Vue2Leaflet/issues/96#issuecomment-341453050) ([alternate solution](https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-319569682)) or [using Webpack aliases](https://github.com/Leaflet/Leaflet/issues/4849#issuecomment-307436996).

#### How can I access the Leaflet map object?
First add a ref to the map
``` html
  <l-map ref="map" :zoom=13 :center="[47.413220, -1.219482]">
    ...
  </l-map>
```
Then in you JavaScript you can use mapObject which is Leaflet map instance :
``` javascript
this.$refs.map.mapObject;
```

**Note:** `mapObject` is not available directly in vue's `mounted` hook. You need to wrap the call to `this.$refs.map` in a `nextTick` call:

``` javascript
data: () => ({map: null}),
mounted () {
  // DON'T
  this.map = this.$refs.map.mapObject // doesn't work, this.map is null

  // DO
  this.$nextTick(() => {
    this.map = this.$refs.map.mapObject // work as expected
  })
},
```

This also work for any other component (Marker, Polyline, etc...)

#### How can I bind events of Vue2Leaflet components?
All event binding can be done to event with the same name as in [leaflet documentation](http://leafletjs.com/reference-1.3.0.html).

For example if you want to listen to Vue2Leaflet.LMarker move event.
``` html
<l-marker :lat-lng="[47.413220, -1.219482]" @move="doSomething"></l-marker>
```


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

