# Vue2Leaflet ![alt text](https://travis-ci.org/KoRiGaN/Vue2Leaflet.svg?branch=master "Travis-ci")
> Vue2 component that helps with leaflet interaction

## Implemented Components

-   [x] Map
-   [x] Marker
-   [x] Popup
-   [x] Tooltip
-   [x] TileLayer
-   [x] TileLayer.WMS
-   [ ] ImageOverlay
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
# install dependencies
npm install

# build for development and production with minification
npm run build

```

## How to display a map
Register Map and TileLayer components from Vue2Leaflet

``` javascript
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
```
v-map and v-tilelayer are names you can choose that must match the tag your are using in your template.

Add the map to your template
``` html
<v-map :zoom=13 :center="[47.413220, -1.219482]">
	<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
</v-map>
```
zoom, center, and url are properties or options of corresponding leaflet object.
See leaflet documentation for more informations <http://leafletjs.com/reference-1.0.0.html>

Make sure the leaflet.css is included, either via a HTML link tag or in your component style via something like
``` css
@import "~leaflet/dist/leaflet.css";
```
If you need to set a custom icon path for leaflet you can directly set Leaflet option like this:
``` javascript
L.Icon.Default.imagePath = "/examples/images/";
```
or add a IconDefault element in your map like this (see custom_path.html for a complete example):
``` html
<v-icondefault :image-path="path"></v-icondefault>
```
## Run demo
``` bash
# Run demo at localhost:8080
npm link
cd examples
npm link vue2-leaflet
npm install
# serve with hot reload at localhost:8080
npm run dev
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
