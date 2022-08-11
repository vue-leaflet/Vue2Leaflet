---
title: LImageOverlay
---

# LImageOverlay

> Easily display a image overlay.

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :crs="crs" :options="{zoomControl: false}">
<l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
<l-marker v-for="star in stars" :lat-lng="star" :key="star.name">
<l-popup :content="star.name"/>
</l-marker>
</l-map>
</template>

<script>
import {LMap, LImageOverlay, LMarker, LPopup} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'http://leafletjs.com/examples/crs-simple/uqm_map_full.png',
      bounds: [[-26.5, -25], [1021.5, 1023]],
      crs: L.CRS.Simple,
      stars: [
        { name: 'Sol', lng: 175.2, lat: 145.0 },
        { name: 'Mizar', lng: 41.6, lat: 130.1 },
        { name: 'Krueger-Z', lng: 13.4, lat: 56.5 },
        { name: 'Deneb', lng: 218.7, lat: 8.3 }
      ]
    };
  }
}
</script>

:::

## Props

| Prop name           | Description                                          | Type          | Values | Default       |
| ------------------- | ---------------------------------------------------- | -------       | ------ | ------------- |
| pane                |                                                      | string        | -      | 'overlayPane' |
| attribution         |                                                      | string        | -      | null          |
| name                |                                                      | string        | -      | undefined     |
| layerType           |                                                      | string        | -      | undefined     |
| visible             |                                                      | boolean       | -      | true          |
| interactive         |                                                      | boolean       | -      | false         |
| bubblingMouseEvents |                                                      | boolean       | -      | true          |
| url                 |                                                      | string        | -      |               |
| bounds              |                                                      | array\|object | -      | null          |
| opacity             |                                                      | number        | -      | 1.0           |
| alt                 |                                                      | string        | -      | ''            |
| crossOrigin         |                                                      | boolean       | -      | false         |
| errorOverlayUrl     |                                                      | string        | -      | ''            |
| zIndex              |                                                      | number        | -      | 1             |
| className           |                                                      | string        | -      | ''            |
| options             | Leaflet options to pass to the component constructor | object        | -      | {}            |
## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
