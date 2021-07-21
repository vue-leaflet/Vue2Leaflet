---
title: LVideoOverlay
---

# LVideoOverlay

> Easily display a video overlay.

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="tilesUrl"></l-tile-layer>
<l-video-overlay :url="videoUrl" :bounds="bounds"></l-video-overlay>
</l-map>
</template>

<script>
import {LMap, LVideoOverlay, LTileLayer} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LVideoOverlay,
    LTileLayer
  },
  data () {
    return {
      zoom: 4,
      center: [25, -110],
      tilesUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      videoUrl: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
      bounds: [[ 32, -130], [ 13, -100]]
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type                  | Values | Default       |
| ------------------- | ---------------------------------------------------- | --------------------- | ------ | ------------- |
| pane                |                                                      | string                | -      | 'overlayPane' |
| attribution         |                                                      | string                | -      | null          |
| name                |                                                      | string                | -      | undefined     |
| layerType           |                                                      | string                | -      | undefined     |
| visible             |                                                      | boolean               | -      | true          |
| interactive         |                                                      | boolean               | -      | false         |
| bubblingMouseEvents |                                                      | boolean               | -      | true          |
| url                 |                                                      | string\|array\|object | -      |               |
| bounds              |                                                      |                       | -      |               |
| opacity             |                                                      | number                | -      | 1.0           |
| alt                 |                                                      | string                | -      | ''            |
| crossOrigin         |                                                      | boolean               | -      | false         |
| errorOverlayUrl     |                                                      | string                | -      | ''            |
| zIndex              |                                                      | number                | -      | 1             |
| className           |                                                      | string                | -      | ''            |
| autoplay            |                                                      | boolean               | -      | true          |
| loop                |                                                      | boolean               | -      | true          |
| keepAspectRatio     |                                                      | boolean               | -      | true          |
| muted               |                                                      | boolean               | -      | false         |
| options             | Leaflet options to pass to the component constructor | object                | -      | {}            |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
