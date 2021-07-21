---
title: LSVGOverlay
---

# LSVGOverlay

> Easily display a svg overlay.

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-svg-overlay :svg="svg" :bounds="bounds"></l-svg-overlay>
</l-map>
</template>

<script>
import {LMap, LSVGOverlay, LTileLayer} from 'vue2-leaflet';

const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
svgElement.setAttribute('viewBox', "0 0 200 200");
svgElement.innerHTML = `
  <rect width="200"
    height="200"/>
  <rect x="75"
    y="23"
    width="50"
    height="50"
    style="fill:red"/>
  <rect x="75"
    y="123"
    width="50"
    height="50"
    style="fill:#0013ff"/>`;

export default {
  components: {
    LMap,
    'l-svg-overlay': LSVGOverlay,
    LTileLayer
  },
  data () {
    return {
      zoom: 4,
      center: [25, -110],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      svg: svgElement,
      bounds: [[ 32, -130], [ 13, -100]]
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type               | Values | Default       |
| ------------------- | ---------------------------------------------------- | ------------------ | ------ | ------------- |
| pane                |                                                      | string             | -      | 'overlayPane' |
| attribution         |                                                      | string             | -      | null          |
| name                |                                                      | string             | -      | undefined     |
| layerType           |                                                      | string             | -      | undefined     |
| visible             |                                                      | boolean            | -      | true          |
| interactive         |                                                      | boolean            | -      | false         |
| bubblingMouseEvents |                                                      | boolean            | -      | true          |
| url                 |                                                      | string             | -      |               |
| bounds              |                                                      |                    | -      |               |
| opacity             |                                                      | number             | -      | 1.0           |
| alt                 |                                                      | string             | -      | ''            |
| crossOrigin         |                                                      | boolean            | -      | false         |
| errorOverlayUrl     |                                                      | string             | -      | ''            |
| zIndex              |                                                      | number             | -      | 1             |
| className           |                                                      | string             | -      | ''            |
| options             | Leaflet options to pass to the component constructor | object             | -      | {}            |
| svg                 |                                                      | string\|SVGElement | -      | null          |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
