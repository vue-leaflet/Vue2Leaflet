<template>
  <div>
    <div style="height: 20%; overflow: auto;">
      <h3>Custom Marker Icons</h3>
      <label for="iconSize">Icon size:</label>
      <input
        id="iconSize"
        v-model="iconSize"
        type="range"
        min="1"
        max="200"
        value="64">
      <label for="customTextInput">Custom text: </label>
      <input
        id="customTextInput"
        v-model="customText"
        type="text">
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 80%">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>

      <!-- Use default icon -->
      <l-marker :lat-lng="[47.413220, -1.219482]" />

      <!-- Use icon given in icon property -->
      <l-marker
        :lat-lng="[47.413220, -1.209482]"
        :icon="icon" />

      <!-- Create image icon (L.icon) from l-icon tag -->
      <l-marker :lat-lng="[47.413220, -1.199482]">
        <l-icon
          :icon-size="[iconSize, iconSize*1.15]"
          :icon-anchor="[iconSize/2, iconSize*1.15]"
          temp-name="icon 1"
          icon-url="static/images/baseball-marker.png" />
      </l-marker>

      <!-- Create HTML icon (L.divIcon) by providing content inside the l-icon tag -->
      <l-marker :lat-lng="[47.413220, -1.189482]">
        <l-icon
          :icon-anchor="[16, 37]"
          temp-name="icon 2"
          class-name="someExtraClass">
          <div class="headline">{{ customText }}</div>
          <img src="static/images/layers.png">
        </l-icon>
      </l-marker>

    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';

export default {
  name: 'Icon',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      icon: L.icon({
        iconUrl: 'static/images/baseball-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      customText: 'Foobar',
      iconSize: 64
    };
  },
  methods: {
  }
};
</script>

<style>
  .someExtraClass {
    background-color: aqua;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 0 20px 20px 20px;
    box-shadow: 5px 3px 10px rgba(0,0,0,0.2);
    text-align: center;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
  }
</style>
