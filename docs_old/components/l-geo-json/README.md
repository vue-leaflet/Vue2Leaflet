# l-geo-json

Easily display a geo-json on the map


## Playground
Any of the props of `l-geo-json` or the classes that it extends can be used

<vuep template="#control-zoom-example"></vuep>

<script v-pre type="text/x-template" id="control-zoom-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
     <l-geo-json
        :geojson="geojson"
      >
      </l-geo-json>
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
      geojson: null
    };
  },
  created () {
    axios.get('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson').then((response) => {
      this.geojson = response.data;
    })
  }
}
</script>
</script>

## Props

```js
{
   geojson: {
      type: [Object, Array],
      custom: true,
      default: () => ({})
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({})
    },
    optionsStyle: {
      type: [Object, Function],
      custom: true,
      default: null
    }
}
```

[filename](../props-notice.md ':include')

## Methods

* **getGeoJSONData** - call leaflet [toGeoJSON](https://leafletjs.com/reference-1.3.0.html#geojson-togeojson) function
* **getBounds** - call leaflet [getElement](https://leafletjs.com/reference-1.3.0.html#geojson-getbounds) function

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** LayerGroup **

[circle.md](../../mixins/layer-group.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

<!-- tabs:end -->
