<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom Url Params</h3>
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      <br />
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 90%">
      <l-tile-layer :options="options" :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      options: { color: "red" },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png?color={color}",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  }
};
</script>
