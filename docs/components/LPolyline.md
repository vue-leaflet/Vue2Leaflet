---
title: LPolyline
---

# LPolyline

> Easily draw a polyline on the map

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LPolyline} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      polyline: {
        latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color: 'green'
      }
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type    | Values | Default       |
| ------------------- | ---------------------------------------------------- | ------- | ------ | ------------- |
| pane                |                                                      | string  | -      | 'overlayPane' |
| attribution         |                                                      | string  | -      | null          |
| name                |                                                      | string  | -      | undefined     |
| layerType           |                                                      | string  | -      | undefined     |
| visible             |                                                      | boolean | -      | true          |
| interactive         |                                                      | boolean | -      | true          |
| bubblingMouseEvents |                                                      | boolean | -      | true          |
| lStyle              |                                                      | object  | -      | null          |
| stroke              |                                                      | boolean | -      | true          |
| color               |                                                      | string  | -      | '#3388ff'     |
| weight              |                                                      | number  | -      | 3             |
| opacity             |                                                      | number  | -      | 1.0           |
| lineCap             |                                                      | string  | -      | 'round'       |
| lineJoin            |                                                      | string  | -      | 'round'       |
| dashArray           |                                                      | string  | -      | null          |
| dashOffset          |                                                      | string  | -      | null          |
| fill                |                                                      | boolean | -      | false         |
| fillColor           |                                                      | string  | -      | '#3388ff'     |
| fillOpacity         |                                                      | number  | -      | 0.2           |
| fillRule            |                                                      | string  | -      | 'evenodd'     |
| className           |                                                      | string  | -      | null          |
| smoothFactor        |                                                      | number  | -      | 1.0           |
| noClip              |                                                      | boolean | -      | false         |
| options             | Leaflet options to pass to the component constructor | object  | -      | {}            |
| latLngs             |                                                      | array   | -      | () => []      |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
