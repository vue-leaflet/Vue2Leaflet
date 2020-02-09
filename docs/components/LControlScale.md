---
title: LControlScale
---

# LControlScale

> Add any custom component as a leaflet control-scale

---

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-control-scale position="topright" :imperial="true" :metric="false"></l-control-scale>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LControlScale} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlScale
  },
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

| Prop name      | Description | Type    | Values | Default    |
| -------------- | ----------- | ------- | ------ | ---------- |
| position       |             | string  | -      | 'topright' |
| options        |             | object  | -      | {}         |
| maxWidth       |             | number  | -      | 100        |
| metric         |             | boolean | -      | true       |
| imperial       |             | boolean | -      | true       |
| updateWhenIdle |             | boolean | -      | false      |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |
