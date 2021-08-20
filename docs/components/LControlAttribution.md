---
title: LControlAttribution
---

# LControlAttribution

> Add any custom component as a leaflet control-attribution

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center" :options="{attributionControl: false}">
<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
<l-control-attribution position="topright" prefix="A custom prefix"></l-control-attribution>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LControlAttribution} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlAttribution
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [47.313220, -1.319482],
    };
  }
}
</script>

:::

## Props

| Prop name | Description                                          | Type            | Values | Default    |
| --------- | ---------------------------------------------------- | --------------- | ------ | ---------- |
| position  |                                                      | string          | -      | 'topright' |
| options   | Leaflet options to pass to the component constructor | object          | -      | {}         |
| prefix    |                                                      | string\|boolean | -      | null       |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |
