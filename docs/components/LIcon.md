---
title: LIcon
---

# LIcon

> Easy and reactive way to configure the icon of a marker

---

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-marker :lat-lng="[47.413220, -1.219482]" > </l-marker>
<l-marker
        :lat-lng="[47.413220, -1.209482]"
        :icon="icon" > </l-marker>
<l-marker :lat-lng="[47.413220, -1.199482]">
<l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="static/images/baseball-marker.png" >
</l-icon>
</l-marker>
<l-marker :lat-lng="[47.413220, -1.189482]">
<l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
<div class="headline">{{ customText }}</div>
<img src="/images/layers.png">
</l-icon>
</l-marker>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482],
      icon: L.icon({
        iconUrl: '/images/baseball-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    };
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  }
}
</script>

:::

## Props

| Prop name       | Description | Type          | Values | Default      |
| --------------- | ----------- | ------------- | ------ | ------------ |
| iconUrl         |             | string        | -      | null         |
| iconRetinaUrl   |             | string        | -      | null         |
| iconSize        |             | object\|array | -      | null         |
| iconAnchor      |             | object\|array | -      | null         |
| popupAnchor     |             | object\|array | -      | () => [0, 0] |
| tooltipAnchor   |             | object\|array | -      | () => [0, 0] |
| shadowUrl       |             | string        | -      | null         |
| shadowRetinaUrl |             | string        | -      | null         |
| shadowSize      |             | object\|array | -      | null         |
| shadowAnchor    |             | object\|array | -      | null         |
| bgPos           |             | object\|array | -      | () => [0, 0] |
| className       |             | string        | -      | ''           |
| options         |             | object        | -      | {}           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
