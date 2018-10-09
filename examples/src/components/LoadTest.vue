<template>
  <div>
    <div style="height: 20%; overflow: auto;">
      <h3>Load test</h3>
      <p> Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }} </p>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>

      <l-marker
        v-for="marker in markers"
        :key="marker.index"
        :lat-lng="marker"
      >
        <l-popup>
          <video
            controls
            muted
            src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
            width="300"
            height="200">
            Sorry, your browser doesn't support embedded videos.
          </video>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'LoadTest',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 1,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 13,
      currentCenter: L.latLng(47.413220, -1.219482)
    };
  },
  computed: {
    markers () {
      const markers = [];
      for (let i = 0; i < 1000; i++) {
        markers.push({lat: Math.random() * 360 - 180, lng: Math.random() * 360 - 180, index: i});
      }
      return markers;
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    }
  }
};
</script>
