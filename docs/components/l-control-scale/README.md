# l-control-scale

Add any custom component as a leaflet control-scale

## Playground
Any of the props of `l-control-scale` or the classes that it extends can be used

<vuep template="#control-scale-example"></vuep>

<script v-pre type="text/x-template" id="control-scale-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-control-scale position="topright" scale="imperial" ></l-control-scale>
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-control-scale', Vue2Leaflet.LControlScale)

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
  maxWidth: {
    type: Number,
    default: 100
  },
  metric: {
    type: Boolean,
    default: true
  },
  imperial: {
    type: Boolean,
    default: true
  },
  updateWhenIdle: {
    type: Boolean,
    default: false
  }
}
```

## Methods

`l-control-scale` does not expose any public method on his own, see inherited ones.

## Extends

<!-- tabs:start -->

## ** Control **

[circle.md](../../mixins/control.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->