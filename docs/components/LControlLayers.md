---
title: LControlLayers
---

# LControlLayers

> Add any custom component as a leaflet control-layers

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-control-layers position="topright"  ></l-control-layers>
<l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"/>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LControlLayers} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
    };
  }
}
</script>

:::

## Props

| Prop name      | Description | Type    | Values | Default    |
| -------------- | ----------- | ------- | ------ | ---------- |
| position       |             | string  | -      | 'topright' |
| options        |             | object  | -      | {}         |
| collapsed      |             | boolean | -      | true       |
| autoZIndex     |             | boolean | -      | true       |
| hideSingleBase |             | boolean | -      | false      |
| sortLayers     |             | boolean | -      | false      |
| sortFunction   |             | func    | -      | undefined  |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |
