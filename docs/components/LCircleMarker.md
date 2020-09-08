---
title: LCircleMarker
---

# LCircleMarker

> A marker in the shape of a circle

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-circle-marker
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
</l-map>
</template>

<script>
import {LMap, LTileLayer, LCircleMarker} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      circle: {
        center: [47.413220, -1.0482],
        radius: 6,
        color: 'red'
      },
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type          | Values | Default      |
| ------------------- | ---------------------------------------------------- | ------------- | ------ | ------------ |
| pane                |                                                      | string        | -      | 'markerPane' |
| attribution         |                                                      | string        | -      | null         |
| name                |                                                      | string        | -      | undefined    |
| layerType           |                                                      | string        | -      | undefined    |
| visible             |                                                      | boolean       | -      | true         |
| interactive         |                                                      | boolean       | -      | true         |
| bubblingMouseEvents |                                                      | boolean       | -      | true         |
| lStyle              |                                                      | object        | -      | null         |
| stroke              |                                                      | boolean       | -      | true         |
| color               |                                                      | string        | -      | '#3388ff'    |
| weight              |                                                      | number        | -      | 3            |
| opacity             |                                                      | number        | -      | 1.0          |
| lineCap             |                                                      | string        | -      | 'round'      |
| lineJoin            |                                                      | string        | -      | 'round'      |
| dashArray           |                                                      | string        | -      | null         |
| dashOffset          |                                                      | string        | -      | null         |
| fill                |                                                      | boolean       | -      | true         |
| fillColor           |                                                      | string        | -      | '#3388ff'    |
| fillOpacity         |                                                      | number        | -      | 0.2          |
| fillRule            |                                                      | string        | -      | 'evenodd'    |
| className           |                                                      | string        | -      | null         |
| radius              |                                                      | number        | -      | null         |
| options             | Leaflet options to pass to the component constructor | object        | -      | {}           |
| latLng              |                                                      | object\|array | -      | () => [0, 0] |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
