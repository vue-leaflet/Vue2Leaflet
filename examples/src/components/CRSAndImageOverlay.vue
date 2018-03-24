<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>CRS and Image Overlay</h3>
    </div>
    <l-map ref="map" style="height: 400px; width: 600px;" :minZoom="minZoom" :crs="crs">
      <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
      <l-marker v-for="star in stars" :lat-lng="star" :key="star.name">
        <l-popup :content="star.name"></l-popup>
      </l-marker>
      <l-polyline :lat-lngs="travel"></l-polyline>
    </l-map>
  </div>
</template>

<script>
import { LMap, LImageOverlay, LMarker, LPopup, LPolyline } from 'vue2-leaflet';

export default {
  name: 'example',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
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
