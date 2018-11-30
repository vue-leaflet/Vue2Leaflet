# l-circle

Draw a path in the shape of a circle around a center positioned at `latLng` coordinates

## Playground
Any of the props of `l-circle` or the classes that it extends can be used

<vuep template="#circle-example"></vuep>


<script v-pre type="text/x-template" id="circle-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-circle', Vue2Leaflet.LCircle)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      circle: {
        center: [47.413220, -1.0482],
        radius: 4500,
        color: 'red'
      }
    };
  }
}
</script>
</script>

## Props

```js
{
    latLng: {
        type: [Object, Array],
        default: () => []
    }
}
```

## Methods

`l-circle` does not expose any public method on his own, see inherited methods.

## Events

`l-circle` does emit any event

## Extends

<!-- tabs:start -->

## ** Circle **

[filename](../../mixins/circle.md ':include')

## ** Path **

[filename](../../mixins/path.md ':include')

## ** Layer **

[filename](../../mixins/layer.md ':include')

## ** InteractiveLayer **

[filename](../../mixins/interactive-layer.md ':include')

<!-- tabs:end -->