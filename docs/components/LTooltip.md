---
title: LTooltip
---

# LTooltip

> Display a tooltip on the map

---

::: tip
Tooltip placed inside a marker will by default appear on marker hover.
:::

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-marker :lat-lng="markerLatLng">
<l-tooltip>Hello!</l-tooltip>
</l-marker>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LTooltip} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>

:::

## Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| content   |             | string | -      | null    |
| options   |             | object | -      | {}      |

## Events

| Event name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ready      | object | Triggers when the component is ready |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
