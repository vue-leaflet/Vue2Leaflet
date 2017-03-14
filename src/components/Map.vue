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
  'popupclose'
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
  },
  worldCopyJump: {
    type: Boolean,
    default: false
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
      worldCopyJump:this.worldCopyJump
    });
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    for (var i = 0; i < this.$children.length; i++) {
      this.$children[i].deferredMountedTo(this.mapObject);
    }
    this.setBounds(this.bounds);
    this.mapObject.whenReady(function() {
      this.$emit('l-ready')
    }, this);
  },
  methods: {
    setCenter(newVal, oldVal) {
      this.mapObject.setView(newVal, this.zoom);
    },
    setBounds(newVal, oldVal) {
      if (!(newVal && newVal.isValid())) {
        return;
      }

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
      // if (this.maxZoom != null) {
      //   options.maxZoom = this.maxZoom;
      // }
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
