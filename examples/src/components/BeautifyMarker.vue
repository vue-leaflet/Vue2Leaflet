<template>
  <div>
    <div id="top_div" style="height: 100%">
      <h2>Beautify marker</h2>
        Custom marker factory is L.BeautifyMarker; custom icon class is L.BeautifyIcon.
      </br>
      <v-map style="height: 90%" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :icon="icon" :lat-lng="marker" :markerFactory="markerFactory">
          <v-popup content="Beautify marker"></v-popup>
        </v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

import "../../node_modules/leaflet.beautifymarker/leaflet-beautify-marker-icon";
import "../../node_modules/leaflet.beautifymarker/leaflet-beautify-marker";

export default {
  name: 'beautify-marker',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
    'v-tilelayer' :Vue2Leaflet.TileLayer
  },
  data () {
    return {
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: L.latLng(47.413220, -1.219482),
      icon: L.BeautifyIcon.icon({
        backgroundColor: 'green',
        borderColor: 'red',
        icon: 'home',
        iconShape: 'marker',
        innerIconAnchor: [0,8],
        textColor: 'white'
      }),
      marker: L.latLng(47.413220, -1.219482),
      markerFactory: L.BeautifyMarker.marker,
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom:13
    }
  }
}
</script>

<style>
@import "../../node_modules/font-awesome/css/font-awesome.css";
@import "../../node_modules/leaflet.beautifymarker/leaflet-beautify-marker-icon.css";
</style>
