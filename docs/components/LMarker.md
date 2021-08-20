---
title: LMarker
---

# LMarker

> Marker component, lets you add and personalize markers on the map

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
<l-marker :lat-lng="markerLatLng" ></l-marker>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>

:::

## Props

| Prop name    | Description                                          | Type          | Values | Default                  |
| ------------ | ---------------------------------------------------- | ------------- | ------ | ------------------------ |
| pane         |                                                      | string        | -      | 'markerPane'             |
| attribution  |                                                      | string        | -      | null                     |
| name         |                                                      | string        | -      | undefined                |
| layerType    |                                                      | string        | -      | undefined                |
| visible      |                                                      | boolean       | -      | true                     |
| options      | Leaflet options to pass to the component constructor | object        | -      | {}                       |
| draggable    |                                                      | boolean       | -      | false                    |
| latLng       |                                                      | object\|array | -      | null                     |
| icon         |                                                      | object        | -      | () => new Icon.Default() |
| opacity      |                                                      | number        | -      | 1.0                      |
| zIndexOffset |                                                      | number        | -      | null                     |

## Events

| Event name     | Type      | Description                                        |
| -------------- | --------- | -------------------------------------------------- |
| update:visible | boolean   | Triggers when the visible prop needs to be updated |
| ready          | object    | Triggers when the component is ready               |
| update:latLng  | undefined |
| update:lat-lng | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
