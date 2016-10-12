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
  bounds: {
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
  paddingBottomRight: {
    custom: true,
    default: null,
  },
  paddingTopLeft: {
    custom: true,
    default: null
  },
  padding: {
    custom: true,
    default: null
  }
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.map(this.$el, {
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
      this.mapObject.setView(newVal, this.zoom);
    },
    setBounds(newVal, oldVal) {
      var options = {};
      if (this.padding) {
        options.padding = this.padding;
      } else {
        if (this.paddingBottomRight) {
          options.paddingBottomRight = this.paddingBottomRight;
        }
        if (this.paddingTopLeft) {
          options.paddingTopLeft = this.paddingTopLeft;
        }
      }
      console.log(options);
      this.mapObject.fitBounds(newVal, options);
    },
    setPaddingBottomRight(newVal, oldVal) {
      this.paddingBottomRight = newVal;
    },
    setPaddingTopLeft(newVal, oldVal) {
      this.paddingTopLeft = newVal;
    },
    setPadding(newVal, oldVal) {
      this.padding = newVal;
    },
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
