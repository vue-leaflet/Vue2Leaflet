---
title: LGeoJson
---

# LGeoJson

> Easily display a geo-json on the map

---

## Demo

::: demo
<template>
<l-map style="height: 350px" :zoom="zoom" :center="center">
<l-tile-layer :url="url"></l-tile-layer>
<l-geo-json :geojson="geojson"></l-geo-json>
</l-map>
</template>

<script>
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      geojson: null
    };
  },
  async created () {
    const response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
    this.geojson = await response.json();
  }
}
</script>

:::

## Props

| Prop name    | Description                                          | Type          | Values | Default       |
| ------------ | ---------------------------------------------------- | ------------- | ------ | ------------- |
| pane         |                                                      | string        | -      | 'overlayPane' |
| attribution  |                                                      | string        | -      | null          |
| name         |                                                      | string        | -      | undefined     |
| layerType    |                                                      | string        | -      | undefined     |
| visible      |                                                      | boolean       | -      | true          |
| options      | Leaflet options to pass to the component constructor | object        | -      | {}            |
| geojson      |                                                      | object\|array | -      | {}            |
| optionsStyle |                                                      | object\|func  | -      | null          |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
