# l-marker
Marker components, lets you add and personalize markers on the map

## Playground
Any of the props of `l-marker` or the classes that it extends can be used

<vuep template="#marker-example"></vuep>

<script v-pre type="text/x-template" id="marker-example">

<template>
  <l-map style="height: 80%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng" ></l-marker>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>
</script>

## Props

```js
{
  pane: {
    type: String,
    default: 'markerPane'
  },
  draggable: {
    type: Boolean,
    custom: true,
    default: false
  },
  latLng: {
    type: [Object, Array],
    custom: true,
    default: null
  },
  icon: {
    type: [Object],
    custom: false,
    default: () => new L.Icon.Default()
  },
  zIndexOffset: {
    type: Number,
    custom: false,
    default: null
  }
}
```

## Methods

`l-marker` does not expose any public method on his own, see inherited ones.

## Events

* **update:latLng** - emitted when the marker is dragged - `update:latLng` is emitted together with an instance of  `L.LatLng` value representing the  current `latLng` of the marker [L.latLng](https://leafletjs.com/reference-1.3.0.html#latlng)

!>  **update:latlng** support `sync` modifier

## Extends

<!-- tabs:start -->

## ** Options **

[path.md](../../mixins/options.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

<!-- tabs:end -->