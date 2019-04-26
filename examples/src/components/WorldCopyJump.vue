<template>
  <div>
    <div style="height: 15%; overflow: auto;">
      <h3>Jump on World Copy</h3>
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      <br />
      <b>Top</b> map has <i>worldCopyJump</i> disabled, while <b>bottom</b> map
      has this feature enabled.
      <br />
      When enabled, the marker is repeated on each "copy" of the world. Scroll
      both to left or right to see it in action.
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      :min-zoom="5"
      :world-copy-jump="false"
      style="height: 42%"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker" />
    </l-map>
    <l-map
      :zoom="zoom"
      :center="center"
      :min-zoom="5"
      :world-copy-jump="true"
      style="height: 43%"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
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
      zoom: 5,
      center: [47.41322, -1.219482],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  }
};
</script>
