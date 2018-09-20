<template>
  <div>
    <div style="height: 10%; overflow: hidden;">
      <h3>Simple map with custom component</h3>
      Marker and Popup added using custom component MarkerPopup
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 90%">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <marker-popup
        :position="marker"
        :text="text"
        :title="title"/>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';

import MarkerPopup from './MarkerPopup';

export default {
  name: 'MarkerPopupExample',
  components: {
    LMap,
    LTileLayer,
    MarkerPopup
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      text: 'my marker popup text',
      title: 'My marker popup title'
    };
  }
};
</script>
