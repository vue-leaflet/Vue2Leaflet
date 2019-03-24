# Vue2Leaflet

<img align="right" height="178" title="Vue2Leaflet Limit logo" src="docs/logo.png">

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

[![Coverage Status](https://coveralls.io/repos/github/KoRiGaN/Vue2Leaflet/badge.svg?branch=master)](https://coveralls.io/github/KoRiGaN/Vue2Leaflet?branch=master)

Vue2Leaflet is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [Leaflet](http://leafletjs.com/) making it easy to create reactive maps.

![Image of Map](docs/vue2leaflet-example.png)

## How to install

``` bash
npm install vue2-leaflet leaflet --save
```

For more detailed information you can follow the [Quick Start Guide](https://korigan.github.io/Vue2Leaflet/#/quickstart.md)

## Breaking change from 1.x.x to 2.x.x

A new major release 2.0,0 is available and come with one breaking change:

### Leaflet is not automatically installed anymore

Leaflet is now a peerDependency and need to be installed manually, we updated our docs to reflect this but please pay attention when migrating

### Importing the library in Webpack / Rollup

Now the code of vue2-leaflet is split component by component (while using a bundler like Webpack/Rollup/Parcel) to do so the following syntax is not working anymore:

```javascript
import Vue2Leaflet from 'vue2-leaflet' // INVALID
```

And has been replaced by

```javascript
import * as Vue2Leaflet from 'vue2-leaflet' // VALID
```

Is highly suggested to import only the needed modules by doing so:

```javascript
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
```

This will reduce the size of the bundle significantly

## Documentation

[Go here](https://korigan.github.io/Vue2Leaflet/) to check out live examples and docs.

If you want to hack around, here is a [JS Fiddle](https://jsfiddle.net/Boumi/k04zpLx9/) to get started

## Leaflet Plugins

Leaflet plugins can easily work with Vue2Leaflet, if you want to use one I would recommand to look at the awesome work made by the community in the list below.

### Vue2Leafet plugins

* [vue2-leaflet-markercluster](https://github.com/jperelli/vue2-leaflet-markercluster) wrapper for [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)
* [vue2-leaflet-polylinedecorator](https://github.com/jperelli/vue2-leaflet-polylinedecorator) wrapper for [PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator)
* [vue2-leaflet-googlemutant](https://github.com/jperelli/vue2-leaflet-googlemutant) wrapper for [GoogleMutant](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant)
* [vue2-leaflet-tracksymbol](https://github.com/ais-one/vue2-leaflet-tracksymbol) wrapper for [TrackSymbol](https://github.com/lethexa/leaflet-tracksymbol)
* [vue-choropleth](https://github.com/voluntadpear/vue-choropleth) to display a choropleth map given a certain GeoJSON
* [vue2-leaflet-geosearch](https://github.com/fega/vue2-leaflet-geosearch) wrapper for [GeoSearch](https://github.com/smeijer/leaflet-geosearch)
* [vue2-leaflet-vectorgrid](https://github.com/tesselo/vue2-leaflet-vectorgrid) wrapper for [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) to display gridded vector data
* [vue2-leaflet-rotatedmarker](https://github.com/imudin/vue2-leaflet-rotatedmarker) wrapper for [RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker)
* [vue2-leaflet-editablecirclemarker](https://github.com/cualbondi/vue2-leaflet-editablecirclemarker) wrapper for [leaflet-editablecirclemarker](https://github.com/cualbondi/leaflet-editablecirclemarker)
* [vue2-leaflet-hotline](https://github.com/ikmolbo/vue2-leaflet-hotline) wrapper for [hotline](https://github.com/iosphere/Leaflet.hotline)
* [vue2-leaflet-movingmarker](https://github.com/LouisMazel/vue2-leaflet-movingmarker) wrapper for [Leaflet.Marker.SlideTo](https://gitlab.com/IvanSanchez/Leaflet.Marker.SlideTo)
* [vue2-leaflet-path-transform](https://github.com/imudin/vue2-leaflet-path-transform) wrapper for [Leaflet.Path.Transform ](https://github.com/w8r/Leaflet.Path.Transform)
* [vue2-leaflet-gpx](https://github.com/tdcook/vue2-leaflet-gpx) wrapper for [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx)
* [vue2-leaflet-locatecontrol](https://github.com/vUdav/vue2-leaflet-locatecontrol) wrapper for [Leaflet.Locate](https://github.com/domoritz/leaflet-locatecontrol)

If you have created a plugin and want it to be listed here, let me know :-).

Vue2Leaflet is only a wrapper for Leaflet. I want to keep it as simple as possible so I don't want to add any plugin support into this repo.

## Authors

Mickaël Bouchaud

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these [wonderful people](https://github.com/KoRiGaN/Vue2Leaflet/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
