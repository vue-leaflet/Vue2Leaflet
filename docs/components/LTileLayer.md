---
title: LTileLayer
---

# LTileLayer

> Load tiles from a map server and display them accordingly to map zoom, center and size

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
</l-map>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';

export default {
  components: { LMap, LTileLayer, },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
    };
  }
}
</script>

:::

## Props

| Prop name      | Description                                          | Type           | Values | Default    |
| -------------- | ---------------------------------------------------- | -------------- | ------ | ---------- |
| pane           |                                                      | string         | -      | 'tilePane' |
| attribution    |                                                      | string         | -      | null       |
| name           |                                                      | string         | -      | undefined  |
| layerType      |                                                      | string         | -      | undefined  |
| visible        |                                                      | boolean        | -      | true       |
| opacity        |                                                      | number         | -      | 1.0        |
| zIndex         |                                                      | number         | -      | 1          |
| tileSize       |                                                      | number\|object | -      | 256        |
| noWrap         |                                                      | boolean        | -      | false      |
| tms            |                                                      | boolean        | -      | false      |
| subdomains     |                                                      | string\|array  | -      | 'abc'      |
| detectRetina   |                                                      | boolean        | -      | false      |
| options        | Leaflet options to pass to the component constructor | object         | -      | {}         |
| url            |                                                      | string         | -      | null       |
| tileLayerClass |                                                      | func           | -      | tileLayer  |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
