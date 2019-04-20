# l-wms-tile-layer

Display WMS services as tile layers on the map

## Playground
Any of the props of `l-wms-tile-layer` or the classes that it extends can be used

<vuep template="#tile-layer-example"></vuep>

<script v-pre type="text/x-template" id="tile-layer-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
   <l-control-layers > </l-control-layers>
    <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base">
    </l-wms-tile-layer>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-control-layers', Vue2Leaflet.LControlLayers)
Vue.component('l-wms-tile-layer', Vue2Leaflet.LWMSTileLayer)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 4,
      center: [47.313220, -1.319482],
      baseUrl: 'https://demo.boundlessgeo.com/geoserver/ows?',
      layers: [
        {
          name: 'Boundaries',
          visible: false,
          layers: 'ne:ne_10m_admin_0_boundary_lines_land'
        },
        {
          name: 'Countries',
          visible: true,
          layers: 'ne:ne_10m_admin_0_countries'
        },
        {
          name: 'Boundaries and Countries',
          visible: true,
          layers: 'ne:ne_10m_admin_0_boundary_lines_land,ne:ne_10m_admin_0_countries'
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
  baseUrl: {
    type: String,
    default: null
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-wms-tile-layer` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** TileLayerWMS **

[circle.md](../../mixins/tile-layer-wms.md ':include')

## ** TileLayer **

[circle.md](../../mixins/tile-layer.md ':include')

## ** GridLayer **

[circle.md](../../mixins/grid-layer.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

<!-- tabs:end -->
