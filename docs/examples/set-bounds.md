---
pageClass: example-page
---

# Fixed Bounds

::: demo
<template>

  <div>
    <div>
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}, bounds are
      {{ bounds }}
      <br>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      :bounds="bounds"
      :max-bounds="maxBounds"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="marker" />
    </l-map>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "SetBounds",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 13,
      center: [0, 0],
      bounds: latLngBounds([
        [40.70081290280357, -74.26963806152345],
        [40.82991732677597, -74.08716201782228]
      ]),
      maxBounds: latLngBounds([
        [40.70081290280357, -74.26963806152345],
        [40.82991732677597, -74.08716201782228]
      ]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  }
};
</script>

:::
