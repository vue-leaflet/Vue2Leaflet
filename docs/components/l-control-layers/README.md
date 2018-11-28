# l-control-layers

Add any custom component as a leaflet control-layers

## Playground
Any of the props of `l-control-layers` or the classes that it extends can be used

<vuep template="#control-layers-example"></vuep>


<script v-pre type="text/x-template" id="control-layers-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-control-layers position="topright"  ></l-control-layers>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      :token="token"
      layer-type="base"/>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-control-layers', Vue2Leaflet.LControlLayers)

export default {
  data () {
    return {
      zoom: 8,
      center: [47.313220, -1.319482],
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      ]
    };
  }
}
</script>
</script>

## Props

```js
{
  collapsed: {
      type: Boolean,
      default: true
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    hideSingleBase: {
      type: Boolean,
      default: false
    },
    sortLayers: {
      type: Boolean,
      default: false
    },
    sortFunction: {
      type: Function,
      default: undefined
    }
}
```

## Methods

`l-control-layers` does not expose any public method on his own, see inherited ones.

## Extends

<!-- tabs:start -->

## ** Control **

[circle.md](../../mixins/control.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->