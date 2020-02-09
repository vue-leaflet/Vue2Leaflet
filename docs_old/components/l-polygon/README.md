# l-polygon

Easily draw a polygon on the map

## Playground
Any of the props of `l-polygon` or the classes that it extends can be used

<vuep template="#polygon-example"></vuep>

<script v-pre type="text/x-template" id="polygon-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
      <l-polygon
      :lat-lngs="polygon.latlngs"
      :color="polygon.color">
      </l-polygon>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-polygon', Vue2Leaflet.LPolygon)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.413220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      polygon: {
        latlngs: [[47.2263299, -1.6222], [47.21024000000001, -1.6270065], [47.1969447, -1.6136169], [47.18527929999999, -1.6143036], [47.1794457, -1.6098404], [47.1775788, -1.5985107], [47.1676598, -1.5753365], [47.1593731, -1.5521622], [47.1593731, -1.5319061], [47.1722111, -1.5143967], [47.1960115, -1.4841843], [47.2095404, -1.4848709], [47.2291277, -1.4683914], [47.2533687, -1.5116501], [47.2577961, -1.5531921], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]],
        color: 'green'
      },
    };
  }
}
</script>
</script>

## Props

```js
{
  latLngs: {
    type: Array,
    default: () => []
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-polygon` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** Polygon **

[path.md](../../mixins/polygon.md ':include')

## ** Polyline **

[path.md](../../mixins/polyline.md ':include')

## ** Path **

[path.md](../../mixins/path.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

## ** InteractiveLayer **

[path.md](../../mixins/interactive-layer.md ':include')

<!-- tabs:end -->
