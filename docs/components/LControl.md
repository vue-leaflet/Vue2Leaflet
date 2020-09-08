---
title: LControl
---

# LControl

> Add any custom component as a leaflet control

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-control position="bottomleft" >
<button @click="clickHandler">
I am a useless button!
</button>
</l-control>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LControl} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControl
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482]
    };
  },
  methods: {
    clickHandler () {
      window.alert('and mischievous')
    }
  }
}
</script>

:::

## Props

| Prop name                | Description                                          | Type    | Values | Default    |
| ------------------------ | ---------------------------------------------------- | ------- | ------ | ---------- |
| position                 |                                                      | string  | -      | 'topright' |
| options                  | Leaflet options to pass to the component constructor | object  | -      | {}         |
| disableClickPropagation  |                                                      | boolean | -      | true       |
| disableScrollPropagation |                                                      | boolean | -      | false      |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
