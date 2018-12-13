# l-rectangle

Easily draw a rectangle on the map

## Playground
Any of the props of `l-rectangle` or the classes that it extends can be used

<vuep template="#rectangle-example"></vuep>

<script v-pre type="text/x-template" id="rectangle-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
       <l-rectangle
        :bounds="rectangle.bounds"
        :l-style="rectangle.style">
        </l-rectangle>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-rectangle', Vue2Leaflet.LRectangle)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.413220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      rectangle: {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]],
        style: { color: 'green', weight: 5 }
      }
    };
  }
}
</script>
</script>

## Props

```js
{
  bounds: {
    type: Array,
    default: () => []
  }
}
```

## Methods

`l-rectangle` does not expose any public method on his own, see inherited ones.

## Events

`l-rectangle` does emit any event

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