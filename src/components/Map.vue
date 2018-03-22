<template>
  <div class="vue2leaflet-map">
    <slot></slot>
  </div>
</template>

<script>
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
    default: () => [0, 0],
  },
  bounds: {
    custom: true,
    default: undefined,
  },
  maxBounds: {
    default: undefined,
  },
  zoom: {
    type: Number,
    custom: true,
    default: 0,
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
  data () {
    return {
      movingRequest: 0,
      lastSetCenter: undefined,
      lastSetBounds: undefined
    }
  },
  mounted () {
    const options = this.options;
    Object.assign(options, {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      maxBounds: this.maxBounds,
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
    this.setBounds(this.bounds);
    this.mapObject.whenReady(function() {
      this.$emit('l-ready')
    }, this);
    this.mapObject.on('moveend', () => {
      if (this.movingRequest != 0) {
        this.movingRequest -= 1;
        return;
      }
      if (this.mapObject.getZoom() != this.zoom) {
        this.$emit('update:zoom', this.mapObject.getZoom());
      }
      let center = this.mapObject.getCenter();
      if (this.center != null) {
        if (Array.isArray(this.center)) {
          this.center[0] = center.lat;
          this.center[1] = center.lng;
        } else {
          this.center.lat = center.lat;
          this.center.lng = center.lng;
        }
      } else {
        this.$emit('update:center', center);
      }

      let bounds = this.mapObject.getBounds();
      if (this.bounds != null) {
        if (Array.isArray(this.bounds)) {
          if (Array.isArray(this.bounds[0])) {
            this.bounds[0][0] = bounds._southWest.lat;
            this.bounds[0][1] = bounds._southWest.lng;
            this.bounds[1][0] = bounds._northEast.lat;
            this.bounds[1][1] = bounds._northEast.lng;
          } else {
            this.bounds[0].lat = bounds._southWest.lat;
            this.bounds[0].lng = bounds._southWest.lng;
            this.bounds[1].lat = bounds._northEast.lat;
            this.bounds[1].lng = bounds._northEast.lng;
          }
        } else {
          this.bounds._southWest.lat = bounds._southWest.lat;
          this.bounds._southWest.lng = bounds._southWest.lng;
          this.bounds._northEast.lat = bounds._northEast.lat;
          this.bounds._northEast.lng = bounds._northEast.lng;
        }
      } else {
        this.$emit('update:bounds', bounds);
      }
    });
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    for (var i = 0; i < this.$children.length; i++) {
      if (typeof this.$children[i].deferredMountedTo === "function") {
        this.$children[i].deferredMountedTo(this.mapObject);
      } else if (typeof this.$children[i].$children[0].deferredMountedTo === "function") {
        this.$children[i].$children[0].deferredMountedTo(this.mapObject);
      }
    }
  },
  methods: {
    setZoom(newVal , oldVal) {
      this.movingRequest += 1;
      this.mapObject.setZoom(newVal);
    },
    setCenter(newVal, oldVal) {
      if (newVal == null) {
        return;
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
      let center = this.lastSetCenter == null ? this.mapObject.getCenter() : this.lastSetCenter;
      if (center.lat != newLat || center.lng != newLng) {
        center.lat = newVal.lat;
        center.lng = newVal.lng;
        this.lastSetCenter = center;
        this.movingRequest += 1;
        this.mapObject.panTo(newVal);
      }
    },
    setBounds(newVal, oldVal) {
      if (!newVal) {
        return;
      }
      if (newVal instanceof L.LatLngBounds) {
        if (!newVal.isValid()) {
          return;
        }
      } else if (!Array.isArray(newVal)) {
        return;
      }
      let bounds = this.lastSetBounds == null ? this.mapObject.getBounds() : this.lastSetBounds;
      let southWestLat = 0;
      let southWestLng = 0;
      let northEastLat = 0;
      let northEastLng = 0;
      if (Array.isArray(bounds)) {
        if (Array.isArray(bounds[0])) {
          southWestLat = bounds[0][0];
          southWestLng = bounds[0][1];
        } else {
          southWestLat = bounds[0].lat;
          southWestLng = bounds[0].lng;
        }
        if (Array.isArray(bounds[1])) {
          northEastLat = bounds[1][0];
          northEastLng = bounds[1][1];
        } else {
          northEastLat = bounds[1].lat;
          northEastLng = bounds[1].lng;
        }
      } else {
        southWestLat = bounds._southWest.lat;
        southWestLng = bounds._southWest.lng;
        northEastLat = bounds._northEast.lat;
        northEastLng = bounds._northEast.lng;
      }
      let southWestNewLat = 0;
      let southWestNewLng = 0;
      let northEastNewLat = 0;
      let northEastNewLng = 0;
      if (Array.isArray(newVal)) {
        newVal = L.latLngBounds(newVal);
      }
      southWestNewLat = newVal._southWest.lat;
      southWestNewLng = newVal._southWest.lng;
      northEastNewLat = newVal._northEast.lat;
      northEastNewLng = newVal._northEast.lng;
      let boundsChanged =
        (southWestNewLat != southWestLat) ||
        (southWestNewLng != southWestLng) ||
        (northEastNewLat != northEastLat) ||
        (northEastNewLng != northEastLng);
      if (boundsChanged) {
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
        this.lastSetBounds = bounds;
        if (Array.isArray(bounds)) {
          if (Array.isArray(bounds[0])) {
            bounds[0][0] = southWestLat;
            bounds[0][1] = southWestLng;
          } else {
            bounds[0].lat = southWestLat;
            bounds[0].lng = southWestLng;
          }
          if (Array.isArray(bounds[1])) {
            bounds[1][0] = northEastLat;
            bounds[1][1] = northEastLng;
          } else {
            bounds[1].lat = northEastLat;
            bounds[1].lng = northEastLng;
          }
        } else {
          bounds._southWest.lat = southWestLat;
          bounds._southWest.lng = southWestLng;
          bounds._northEast.lat = northEastLat;
          bounds._northEast.lng = northEastLng;
        }
        this.movingRequest += 1;
        this.mapObject.fitBounds(newVal, options);
      }
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
