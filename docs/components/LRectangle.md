---
title: LRectangle
---

# LRectangle

> Easily draw a rectangle on the map

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
<l-rectangle :bounds="rectangle.bounds" :l-style="rectangle.style"></l-rectangle>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LRectangle} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LRectangle
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [47.313220, -1.319482],
      rectangle: {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]],
        style: { color: 'red', weight: 3 }
      }
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type    | Values | Default             |
| ------------------- | ---------------------------------------------------- | ------- | ------ | ------------------- |
| pane                |                                                      | string  | -      | 'overlayPane'       |
| attribution         |                                                      | string  | -      | null                |
| name                |                                                      | string  | -      | undefined           |
| layerType           |                                                      | string  | -      | undefined           |
| visible             |                                                      | boolean | -      | true                |
| interactive         |                                                      | boolean | -      | true                |
| bubblingMouseEvents |                                                      | boolean | -      | true                |
| lStyle              |                                                      | object  | -      | null                |
| stroke              |                                                      | boolean | -      | true                |
| color               |                                                      | string  | -      | '#3388ff'           |
| weight              |                                                      | number  | -      | 3                   |
| opacity             |                                                      | number  | -      | 1.0                 |
| lineCap             |                                                      | string  | -      | 'round'             |
| lineJoin            |                                                      | string  | -      | 'round'             |
| dashArray           |                                                      | string  | -      | null                |
| dashOffset          |                                                      | string  | -      | null                |
| fill                |                                                      | boolean | -      | true                |
| fillColor           |                                                      | string  | -      | '#3388ff'           |
| fillOpacity         |                                                      | number  | -      | 0.2                 |
| fillRule            |                                                      | string  | -      | 'evenodd'           |
| className           |                                                      | string  | -      | null                |
| smoothFactor        |                                                      | number  | -      | 1.0                 |
| noClip              |                                                      | boolean | -      | false               |
| options             | Leaflet options to pass to the component constructor | object  | -      | {}                  |
| bounds              |                                                      | func    | -      | () => [[0,0],[0,0]] |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
