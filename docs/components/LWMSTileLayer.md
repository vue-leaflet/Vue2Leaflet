---
title: LWMSTileLayer
---

# LWMSTileLayer

> Display WMS services as tile layers on the map

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
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
import {LMap, LWMSTileLayer, LControlLayers } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LControlLayers,
    'l-wms-tile-layer': LWMSTileLayer
  },
  data () {
    return {
      zoom: 1,
      center: [47.313220, -1.319482],
      baseUrl: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
      layers: [
        {
          name: 'Weather Data',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        }
      ]
    };
  }
}
</script>

:::

## Props

| Prop name    | Description                                          | Type                  | Values | Default      |
| ------------ | ---------------------------------------------------- | --------------------- | ------ | ------------ |
| pane         |                                                      | string                | -      | 'tilePane'   |
| attribution  |                                                      | string                | -      | null         |
| name         |                                                      | string                | -      | undefined    |
| layerType    |                                                      | string                | -      | undefined    |
| visible      |                                                      | boolean               | -      | true         |
| opacity      |                                                      | number                | -      | 1.0          |
| zIndex       |                                                      | number                | -      | 1            |
| tileSize     |                                                      | number\|object\|array | -      | 256          |
| noWrap       |                                                      | boolean               | -      | false        |
| tms          |                                                      | boolean               | -      | false        |
| subdomains   |                                                      | string\|array         | -      | 'abc'        |
| detectRetina |                                                      | boolean               | -      | false        |
| layers       |                                                      | string                | -      | ''           |
| styles       |                                                      | string                | -      | ''           |
| format       |                                                      | string                | -      | 'image/jpeg' |
| transparent  |                                                      | boolean               | -      |              |
| version      |                                                      | string                | -      | '1.1.1'      |
| crs          |                                                      | object                | -      | null         |
| upperCase    |                                                      | boolean               | -      | false        |
| options      | Leaflet options to pass to the component constructor | object                | -      | {}           |
| baseUrl      |                                                      | string                | -      | null         |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
