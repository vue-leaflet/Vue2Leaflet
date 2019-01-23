# l-control-zoom

Customize the look of the zoom-control

## Playground
Any of the props of `l-control-zoom` or the classes that it extends can be used

> When using custom controls is a good idea to disable native leaflet controls with the options prop `:options="{zoomControl: false}"`

<vuep template="#control-zoom-example"></vuep>

<script v-pre type="text/x-template" id="control-zoom-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-control-zoom position="topright"  ></l-control-zoom>
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-control-zoom', Vue2Leaflet.LControlZoom)

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
  zoomInText: {
    type: String,
    default: '+'
  },
  zoomInTitle: {
    type: String,
    default: 'Zoom in'
  },
  zoomOutText: {
    type: String,
    default: '-'
  },
  zoomOutTitle: {
    type: String,
    default: 'Zoom out'
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-control-zoom` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

`l-control-zoom` does not emit any event on his own.

[filename](../events-notice.md ':include')

## Extends

<!-- tabs:start -->

## ** Control **

[circle.md](../../mixins/control.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
