<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>GeoJSON</h3>
      <span
      v-if="loading"
      >Loading...</span>
      <label for="checkbox">GeoJSON Visibility</label>
      <input
        id="checkbox"
        v-model="show"
        type="checkbox">
      <input
        type="color"
        v-model="fillColor" />
      <br>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 90%">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"/>
      <l-marker :lat-lng="marker"/>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet';

import axios from 'axios';

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data () {
    return {
      loading: false,
      show: true,
      zoom: 6,
      center: [48, -1.219482],
      geojson: null,
      fillColor: '#e4ce7f',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482)
    };
  },
  computed: {
    options () {
      return {
        style: this.styleFunction
      }
    },
    styleFunction () {
      return {
        weight: 2,
        color: '#ECEFF1',
        opacity: 1,
        fillColor: this.fillColor,
        fillOpacity: 1
      }
    }
  },
  created () {
    this.loading = true
    axios.get('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson').then(response => {
      this.geojson = response.data;
      this.loading = false
    });
  }
};
</script>
