---
title: LMap
---

# LMap

> Base component, contains and wraps all the other components.

---

::: tip
If your markup does not have a root `<l-map>` something is wrong.
:::

## Demo

::: demo
<template>

  <div style="height: 350px;">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>

:::

## Props

| Prop name              | Description                                          | Type          | Values         | Default            |
| ---------------------- | ---------------------------------------------------- | ------------- | -------------- | ------------------ |
| options                | Leaflet options to pass to the component constructor | object        | -              | {}                 |
| center                 | The center of the map, supports .sync modifier       | object\|array | -              | () => [0, 0]       |
| bounds                 | The bounds of the map, supports .sync modifier       | array\|object | -              | null               |
| maxBounds              | The max bounds of the map                            | array\|object | -              | null               |
| zoom                   | The zoom of the map, supports .sync modifier         | number        | -              | 0                  |
| minZoom                | The minZoom of the map                               | number        | -              | null               |
| maxZoom                | The maxZoom of the map                               | number        | -              | null               |
| paddingBottomRight     | The paddingBottomRight of the map                    | array         | -              | null               |
| paddingTopLeft         | The paddingTopLeft of the map                        | array         | -              | null               |
| padding                | The padding of the map                               | array         | -              | null               |
| worldCopyJump          | The worldCopyJump option for the map                 | boolean       | -              | false              |
| crs                    | The crs option for the map                           | object        | `CRS.EPSG3857` | () => CRS.EPSG3857 |
| maxBoundsViscosity     |                                                      | number        | -              | null               |
| inertia                |                                                      | boolean       | -              | null               |
| inertiaDeceleration    |                                                      | number        | -              | null               |
| inertiaMaxSpeed        |                                                      | number        | -              | null               |
| easeLinearity          |                                                      | number        | -              | null               |
| zoomAnimation          |                                                      | boolean       | -              | null               |
| zoomAnimationThreshold |                                                      | number        | -              | null               |
| fadeAnimation          |                                                      | boolean       | -              | null               |
| markerZoomAnimation    |                                                      | boolean       | -              | null               |
| noBlockingAnimations   |                                                      | boolean       | -              | false              |
| noMoveStartOnPanning   | The `noMoveStart` option passed to panning methods   | boolean       | -              | false              |

## Events

| Event name    | Type          | Description                          |
| ------------- | ------------- | ------------------------------------ |
| leaflet:load  |               | DEPRECATED event                     |
| ready         | object        | Triggers when the component is ready |
| update:zoom   | number,string | Triggers when zoom is updated        |
| update:center | object,array  | Triggers when center is updated      |
| update:bounds | object        | Triggers when bounds are updated     |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
