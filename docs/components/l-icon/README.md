# l-icon

Easy and reactive way to configure the icon of a marker


## Playground
Any of the props of `l-geo-json` or the classes that it extends can be used

<vuep template="#control-zoom-example"></vuep>

<script v-pre type="text/x-template" id="control-zoom-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
   <l-geo-json
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-geo-json', Vue2Leaflet.LGeoJson)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      caller: null,
      circle: {
        center: [47.413220, -1.0482],
        radius: 4500,
        color: 'red'
      }
    };
  },
  methods: {
    openPopUp (latLng, caller) {
      this.caller = caller;
      this.$refs.features.mapObject.openPopup(latLng);
    }
  }
}
</script>
</script>

## Props

```js
{
   iconUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    iconAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    popupAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    tooltipAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    shadowUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    shadowAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    bgPos: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    className: {
      type: String,
      custom: true,
      default: ''
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({})
    }
}
```

## Methods

* **getGeoJSONData** - call leaflet [toGeoJSON](https://leafletjs.com/reference-1.3.0.html#geojson-togeojson) function
* **getBounds** - call leaflet [getElement](https://leafletjs.com/reference-1.3.0.html#geojson-getbounds) function

## Extends

<!-- tabs:start -->

## ** LayerGroup **

[circle.md](../../mixins/layer-group.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

<!-- tabs:end -->