---
title: LControlZoom
---

# LControlZoom

> Add any custom component as a leaflet control-zoom

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center" :options="{zoomControl: false}">
<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
<l-control-zoom position="bottomright"  ></l-control-zoom>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LControlZoom} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom
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

| Prop name    | Description                                          | Type   | Values | Default    |
| ------------ | ---------------------------------------------------- | ------ | ------ | ---------- |
| position     |                                                      | string | -      | 'topright' |
| options      | Leaflet options to pass to the component constructor | object | -      | {}         |
| zoomInText   |                                                      | string | -      | '+'        |
| zoomInTitle  |                                                      | string | -      | 'Zoom in'  |
| zoomOutText  |                                                      | string | -      | '-'        |
| zoomOutTitle |                                                      | string | -      | 'Zoom out' |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |
