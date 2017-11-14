<template>
  <div>
    <div style="height: 10%; overflow: hidden;">
      <h3>Simple map with custom component</h3>
      Marker and Popup added using custom component MarkerPopup
    </div>
    <v-map style="height: 90%" :zoom="zoom" :center="center">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker-popup :position="marker" :text="text" :title="title"></v-marker-popup>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import MarkerPopup from './MarkerPopup';

export default {
  name: 'MarkerPopupExample',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker-popup': MarkerPopup
  },
  data () {
    return {
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      text: 'my marker popup text',
      title: 'My marker popup title'
    }
  }
}
</script>
