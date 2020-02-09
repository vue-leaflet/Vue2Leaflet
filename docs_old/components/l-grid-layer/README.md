# l-grid-layer

 <img src="https://img.shields.io/badge/Version-beta-red.svg" alt="Version">

Creates a map layer where each tile is an instanciated Vue component.
Each tile component is given `coords` props by `l-grid-layer` to indicate
the zoom level and position of the tile
(see https://leafletjs.com/examples/extending/extending-2-layers.html#lgridlayer-and-dom-elements).

## Playground
Any of the props of `l-grid-layer` or the classes that it extends can be used

<vuep template="#grid-layer-example"></vuep>

<script v-pre type="text/x-template" id="grid-layer-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-grid-layer :tile-component="tileComponent"></l-grid-layer>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-grid-layer', Vue2Leaflet.LGridLayer)

export default {
  data () {
    return {
      tileComponent: {
        name: 'tile-component',
        props: {
          coords: {
            type: Object,
            required: true
          }
        },
        template: '<div>Coords: {{coords.x}}, {{coords.y}}, {{coords.z}}</div>'
      },
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
  tileComponent: {
    type: Object,
    required: true
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-grid-layer` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

Leaflet's `tileunload` event is internally used to trigger the destruction
of the tile components when a tile leaves the visible area.

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** GridLayer **

[circle.md](../../mixins/grid-layer.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
