# Vue2Leaflet

> Vue2 component that helps with leaflet interaction

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## How to display a map
Register Map and TielLayer components from Vue2Leaflet

``` javascript
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
```
v-map and v-tilelayer are name you can choose that must match the tag your are using in your template.

Add the map to your template
``` html
<v-map :zoom=13 :center="[47.413220, -1.219482]">
	<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
</v-map>
```
zoom, center, and url are properties or options of corresponding leaflet object.
See leaflet documentation for more informations <http://leafletjs.com/reference-1.0.0.html>

## Run demo
``` bash
# serve with hot reload at localhost:8080
npm run dev
```
Go to <http://localhost:8080/examples/simple.html> to see a simple example displaying a marker

Go to <http://localhost:8080/examples/multi_map.html> to see two map with binding to the same data source

Go to <http://localhost:8080/examples/multi_map.html> to see two map with binding to the same data source
