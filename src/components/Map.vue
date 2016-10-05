<template>
  <div class="map-container">
    <div class="map-container">
      <div id="map"></div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Vue from 'vue'
import L from 'leaflet';
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'contextmenu',
  'focus',
  'blur',
  'preclick',
  'load',
  'unload',
  'viewreset',
  'movestart',
  'move',
  'moveend',
  'dragstart',
  'drag',
  'dragend',
  'zoomstart',
  'zoomend',
  'zoomanim',
  'zoomlevelschange',
  'resize',
  'autopanstart',
  'layeradd',
  'layerremove',
  'baselayerchange',
  'overlayadd',
  'overlayremove',
  'locationfound',
  'locationerror',
  'popupopen',
  'popupclose',
];

const props = {
  center: {
    custom: true,
    default: undefined,
  },
  zoom: {
    type: Number,
    default: undefined,
  },
  minZoom: {
    type: Number,
    default: undefined,
  },
  maxZoom: {
    type: Number,
    default: undefined,
  },
};

export default {
  props: props,
  mounted() {
    L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
    new L.Icon.Default({
      iconUrl: L.Icon.Default.imagePath + "/marker-icon-green.png",
      iconRetinaUrl: L.Icon.Default.imagePath + "/marker-icon-green-2x.png"
    });
    this.mapObject = L.map('map', {
      center:this.center,
      zoom:this.zoom,
      minZoom:this.minZoom,
      maxZoom:this.maxZoom,
    });
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    var that = this.mapObject;
    _.forEach(this.$children, (child) => {
      child.deferredMountedTo(that);
    });
  },
  methods: {
    setCenter(newVal, oldVal) {
      console.log(newVal);
      this.mapObject.setView(newVal, this.zoom);
    }
  },
}
</script>

<style type="text/css">
  #map {
    height: 100%;
    width: 100%;
  }
  .map-container {
    height: 100%;
    width: 100%;
  }
</style>
