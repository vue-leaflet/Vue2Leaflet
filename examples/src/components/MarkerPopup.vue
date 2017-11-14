<template>
  <v-marker :lat-lng="position" :title="title" :draggable="false">
    <v-popup :content="text"></v-popup>
  </v-marker>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'MarkerPopup',
  components: {
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup
  },
  props: ['text', 'position', 'title'],
}
</script>
