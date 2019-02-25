# l-tile-layer

Load tiles from a map server and display them accordingly to map zoom, center and size

## Playground
Any of the props of `l-tile-layer` or the classes that it extends can be used

<vuep template="#tile-layer-example"></vuep>

<script v-pre type="text/x-template" id="tile-layer-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482]
    };
  }
}
</script>
</script>

## Props

```js
{
  url: {
    type: String,
    default: null
  },
  tileLayerClass: {
    type: Function,
    default: L.tileLayer
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-tile-layer` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

`l-tile-layer` does not emit any event on his own.

[filename](../events-notice.md ':include')

## Extends

<!-- tabs:start -->

## ** TileLayer **

[circle.md](../../mixins/tile-layer.md ':include')

## ** GridLayer **

[circle.md](../../mixins/grid-layer.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
