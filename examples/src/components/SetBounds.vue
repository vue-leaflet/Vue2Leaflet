<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Set Bounds</h3>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}, bounds are {{ bounds}}
      </br>
    </div>
    <v-map :zoom="zoom" style="height: 90%" :center="center" :bounds="bounds" :max-bounds="maxBounds">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

var corner1 = L.latLng();
var corner2 = L.latLng();

export default {
  name: 'set-bounds',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      zoom:13,
      center:[0, 0],
      bounds: L.latLngBounds([[40.70081290280357, -74.26963806152345], [40.82991732677597, -74.08716201782228]]),
      maxBounds: L.latLngBounds([[40.70081290280357, -74.26963806152345], [40.82991732677597, -74.08716201782228]]),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
    }
  }
}
</script>
