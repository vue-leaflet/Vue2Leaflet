<template>
  <div>
    <div id="top_div" style="height: 100%">
      <h2>CRS and Image Overlay</h2>
      <v-map ref="map" style="height: 400px; width: 600px;" :minZoom="minZoom" :crs="crs">
        <v-image-overlay :url="url" :bounds="bounds"></v-image-overlay>
        <v-marker v-for="star in stars" :lat-lng="star" :key="star.name">
          <v-popup :content="star.name"></v-popup>
        </v-marker>
        <v-polyline :lat-lngs="travel"></v-polyline>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-image-overlay': Vue2Leaflet.ImageOverlay,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
    'v-polyline': Vue2Leaflet.Polyline,
  },
  data () {
    return {
      url:'http://leafletjs.com/examples/crs-simple/uqm_map_full.png',
      bounds: [[-26.5,-25], [1021.5,1023]],
      minZoom: -2,
      crs: L.CRS.Simple,
      stars: [
        { name: "Sol", lng: 175.2, lat: 145.0 },
        { name: "Mizar", lng: 41.6, lat: 130.1 },
        { name: "Krueger-Z", lng: 13.4, lat: 56.5 },
        { name: "Deneb", lng: 218.7, lat: 8.3 },
      ],
      travel: [[145.0, 175.2], [8.3, 218.7]],
    }
  },
  mounted() {
    this.$refs.map.mapObject.setView([70, 120], 1);
  }
}
</script>
