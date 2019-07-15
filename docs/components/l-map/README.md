# l-map

Base component, contains and wrap all the other components.

!> If your markup does not have a root `<l-map>` something is wrong.


## Playground
Any of the props of `l-map` or the classes that it extends can be used

<vuep template="#map-example"></vuep>

<script v-pre type="text/x-template" id="map-example">

<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>
</script>

## Props

```js
{
  center: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    bounds: {
      type: [Array, Object],
      custom: true,
      default: null
    },
    maxBounds: {
      type: [Array, Object],
      default: null
    },
    zoom: {
      type: Number,
      custom: true,
      default: 0
    },
    minZoom: {
      type: Number,
      default: null
    },
    maxZoom: {
      type: Number,
      default: null
    },
    paddingBottomRight: {
      type: Array,
      custom: true,
      default: null
    },
    paddingTopLeft: {
      type: Array,
      custom: true,
      default: null
    },
    padding: {
      type: Array,
      custom: true,
      default: null
    },
    worldCopyJump: {
      type: Boolean,
      default: false
    },
    crs: {
      type: Object,
      custom: true,
      default: () => L.CRS.EPSG3857
    },
    maxBoundsViscosity: {
      type: Number,
      default: null
    },
    inertia: {
      type: Boolean,
      default: null
    },
    inertiaDeceleration: {
      type: Number,
      default: null
    },
    inertiaMaxSpeed: {
      type: Number,
      default: null
    },
    easeLinearity: {
      type: Number,
      default: null
    },
    zoomAnimation: {
      type: Boolean,
      default: null
    },
    zoomAnimationThreshold: {
      type: Number,
      default: null
    },
    fadeAnimation: {
      type: Boolean,
      default: null
    },
    markerZoomAnimation: {
      type: Boolean,
      default: null
    },
    noBlockingAnimations: {
      type: Boolean,
      default: false
    },
    attributionControl: {
      type: Boolean,
      default: true
    }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-map` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

* **leaflet:load** - emitted when the leaflet map instance is ready **This Event is deprecated in favour of `ready`**
* **update:zoom** - emitted when the zoom of the map changes - `update:zoom` is emitted together with a `Number` value representing the  current `zoom`
* **update:center** - emitted when the center of the map changes - `update:center` is emitted together with an instance of  `L.LatLng` value representing the  current `center` [L.latLng](https://leafletjs.com/reference-1.3.0.html#latlng)
* **update:bounds** - emitted when the bounds of the map changes - `update:bounds` is emitted together with an instance of  `L.latLngBounds` value representing the  current `bound` [L.latLngBounds](https://leafletjs.com/reference-1.3.0.html#latlngbounds)

!>  **update:zoom**, **update:center**, **update:bounds** are all debounced events based on `leaflet` `moveend` event and support `sync` modifier

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
