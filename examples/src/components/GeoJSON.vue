<template>
  <div>
    <div id="top_div">
      <h2>GeoJSON</h2>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      </br>
    </div>
    <div id="bottom_div">
      <v-map :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-geojson-layer :geojson="geojson" :options="options"></v-geojson-layer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import geojsonData from '../assets/geojson/france.json'

export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-geojson-layer' :Vue2Leaflet.GeoJSON,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      zoom:6,
      center:[48, -1.219482],
      geojson: geojsonData,
      options: {
        style: function () {
          return {
            weight: 2,
            color: '#ECEFF1',
            opacity: 1,
            fillColor: '#e4ce7f',
            fillOpacity: 1
          }
        }
      },
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
    }
  }
}
</script>
