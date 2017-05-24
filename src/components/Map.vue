<template>
  <div class="vue2leaflet-map">
    <slot></slot>
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
  'zoom',
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
    type: [Object, Array],
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
  },
  crs: {
    custom: true,
    default: () => L.CRS.EPSG3857,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  props: props,
  mounted() {
    const options = this.options;
    Object.assign(options, {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      worldCopyJump: this.worldCopyJump,
      crs: this.crs,
    });
    if (this.center != null) {
      options.center = this.center;
    }
    if (this.zoom != null) {
      options.zoom = this.zoom;
    }
    this.mapObject = L.map(this.$el, options);
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
      if (newVal == null) {
        return;
      }

      let wasUndefined = false;
      let oldLat = 0;
      let oldLng = 0;
      if (oldVal == null) {
        wasUndefined = true;
      } else if (Array.isArray(oldVal)) {
        oldLat = oldVal[0];
        oldLng = oldVal[1];
      } else {
        oldLat = oldVal.lat;
        oldLng = oldVal.lng;
      }

      let newLat = 0;
      let newLng = 0;
      if (Array.isArray(newVal)) {
        newLat = newVal[0];
        newLng = newVal[1];
      } else {
        newLat = newVal.lat;
        newLng = newVal.lng;
      }
      let centerChanged = wasUndefined || (newLat != oldLat) || (newLng != oldLng);
      if (centerChanged) {
        this.mapObject.setView(newVal, this.zoom);
      }
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
    setCrs(newVal, oldVal) {
      console.log('Changing CRS is not yet supported by Leaflet');
    },
    fitBounds(bounds) {
      this.mapObject.fitBounds(bounds);
    }
  },
}
</script>

<style type="text/css">
  .vue2leaflet-map {
    height: 100%;
    width: 100%;
  }
</style>
