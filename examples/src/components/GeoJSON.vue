<template>
  <div>
    <div id="top_div" style="height: 100%">
      <h2>GeoJSON</h2>
      <p>Marker is placed at {{ marker.lat }}, {{ marker.lng }}</p>
      <label for="checkbox">visibility</label>
      <input type="checkbox" id="checkbox" v-model="show">
      </br>
      <v-map style="height: 90%" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-geojson-layer v-if="show" :geojson="geojson" :options="options"></v-geojson-layer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import axios from 'axios';

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
      show: true,
      zoom:6,
      center:[48, -1.219482],
      geojson: null,
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
  },
  created () {
    axios.get("https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson").then(response => {
      this.geojson = response.data;
    });
  },
}
</script>
