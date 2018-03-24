<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>GeoJSON</h3>
      <label for="checkbox">GeoJSON Visibility</label>
      <input type="checkbox" id="checkbox" v-model="show">
      </br>
    </div>
    <l-map style="height: 90%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json v-if="show" :geojson="geojson" :options="options"></l-geo-json>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker } from 'vue2-leaflet';
import axios from 'axios';

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
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
