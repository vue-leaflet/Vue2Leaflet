# Vue2Leaflet

<a href="https://travis-ci.org/KoRiGaN/Vue2Leaflet"><img src="https://travis-ci.org/KoRiGaN/Vue2Leaflet.svg?branch=master" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue2-leaflet"><img src="https://img.shields.io/npm/dt/vue2-leaflet.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue2-leaflet"><img src="https://img.shields.io/npm/v/vue2-leaflet.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue2-leaflet"><img src="https://img.shields.io/npm/l/vue2-leaflet.svg" alt="License"></a>


> Vue2 component that helps with leaflet interaction


## How to display a map with a marker

Register Map and TileLayer components from Vue2Leaflet
``` javascript
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
```

Add the map to your page
``` html
<div id="app" style="height: 100%">
  <v-map :zoom=13 :center="[47.413220, -1.219482]">
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
  </v-map>
</div>
```

``` javascript
new Vue({ el: '#app'});
```

Make sure the leaflet.css is included, either via a HTML link tag or in your vue component style

``` css
@import "~leaflet/dist/leaflet.css";
```
Here is the result

![Image of Map](https://korigan.github.com/Vue2Leaflet/images/example_map.png)

## [Live Demo here](https://korigan.github.io/Vue2Leaflet/)

More live demos will come soon

### If you want to try it here is a [JS Fiddle Hello Map of the World](https://jsfiddle.net/Boumi/k04zpLx9/)

## How to install

``` bash
$ npm install vue2-leaflet --save
```

## List of currently implemented components

-   [x] Map
-   [x] Marker
-   [x] Popup
-   [x] Tooltip
-   [x] TileLayer
-   [x] TileLayer.WMS
-   [x] ImageOverlay
-   [x] Polyline
-   [x] Polygon
-   [x] Rectangle
-   [x] Circle
-   [ ] CircleMarker
-   [x] LayerGroup
-   [ ] FeatureGroup
-   [x] GeoJSON

## Build Setup

``` bash
# Once you have cloned this repo, install dependencies
$ npm install

# build for development and production with minification
$ npm run build

```
## Leaflet Plugins
This repo is a wrapper for Leafet and VueJs. I want to keep it as simple as possible so I don't want to add any plugin support into this repo.

Leaflet plugins can easily work with Vue2Leaflet, if you want to use one I would recommand to look at the awesome work made by the community in the list below.

#### Vue2Leafet plugins:
*  [MarkerCluster](https://github.com/jperelli/vue2-leaflet-markercluster)
*  [TrackSymbol](https://github.com/ais-one/vue2-leaflet-tracksymbol)

If you have created a plugin and want it to be listed here, let me know :-).

## FAQ
#### How can I access the Leaflet map object ?
First add a ref to the map
``` html
<div id="app" style="height: 100%">
  <v-map ref="map" :zoom=13 :center="[47.413220, -1.219482]">
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
  </v-map>
</div>
```
Then in you javascript you can use mapObject which is Leaflet map instance :
``` javascript
this.$refs.map.mapObject;
```
This also work for any other component (Marker, Polyline, etc...)

#### How can I bind events of Vue2Leaflet components ?
All event binding can be done to event called l-[leaflet_event], where [leaflet_event] is the name of the event from leaflet documentation.

For example if you want to bind to leaflet marker move event, you can bind to Vue2Leaflet.Marker l-move event.
```
<div id="app" style="height: 100%">
  <v-map :zoom=13 :center="[47.413220, -1.219482]">
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker :lat-lng="[47.413220, -1.219482]" :l-move="doSomething"></v-marker>
  </v-map>
</div>
```
## Run demo locally
``` bash
# Run demo at localhost:8080
$ npm link
$ cd examples
$ npm link vue2-leaflet
$ npm install
# serve with hot reload at localhost:8080
$ npm run dev
```
Go to <http://localhost:8080/> to see a some examples

NOTE: If you make changes to the library you should run 'npm run build' again in the root folder.
The dev server should detect modification and reload the demo
## Authors

Mickaël Bouchaud

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these wonderful people:

*   [@zuck](https://github.com/zuck)
*   [@SiggyF](https://github.com/SiggyF)
*   [@nikos](https://github.com/nikos)
*   [@Ralf8686](https://github.com/Ralf8686)
*   [@antixrist](https://github.com/antixrist)
*   [@jteppinette](https://github.com/jteppinette)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
