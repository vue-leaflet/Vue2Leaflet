# l-polyline

Easily draw a line made of several segment on the map

## Playground
Any of the props of `l-polyline` or the classes that it extends can be used

<vuep template="#polyline-example"></vuep>

<script v-pre type="text/x-template" id="polyline-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
      <l-polyline
      :lat-lngs="polyline.latlngs"
      :color="polyline.color">
      </l-polyline>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-polyline', Vue2Leaflet.LPolyline)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.413220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      polyline: {
        latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color: 'green'
      }
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

`l-polyline` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** Polyline **

[path.md](../../mixins/polyline.md ':include')

## ** Path **

[path.md](../../mixins/path.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

## ** InteractiveLayer **

[path.md](../../mixins/interactive-layer.md ':include')

<!-- tabs:end -->
