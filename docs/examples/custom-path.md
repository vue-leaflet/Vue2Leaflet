---
pageClass: example-page
---

# Custom Path

::: demo
<template>

  <div>
    <div>
      Marker icon are retrieved from {{ path }} custom path
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="marker" />
      <l-icon-default :image-path="path" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIconDefault } from "vue2-leaflet";

export default {
  name: "CustomPath",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIconDefault
  },
  data() {
    return {
      zoom: 13,
      path: "/images/",
      center: [47.41322, -1.219482],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  }
};
</script>

:::
