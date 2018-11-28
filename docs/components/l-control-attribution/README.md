# l-control-attribution

Add any custom component as a leaflet control-attribution

## Playground
Any of the props of `l-control-attribution` or the classes that it extends can be used

<vuep template="#control-attribution-example"></vuep>


<script v-pre type="text/x-template" id="control-attribution-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control-attribution position="topright" prefix="A custom prefix" >
    </l-control-attribution>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-control-attribution', Vue2Leaflet.LControlAttribution)

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
  prefix: {
      type: String,
      default: null
    }
}
```

## Methods

`l-control-attribution` does not expose any public method on his own, see inherited ones.

## Extends

<!-- tabs:start -->

## ** Control **

[circle.md](../../mixins/control.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->