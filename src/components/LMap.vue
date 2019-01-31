<template>
  <div class="vue2leaflet-map">
    <slot v-if="ready" />
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import debounce from '../utils/debounce.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Options from '../mixins/Options.js';
import { CRS, DomEvent, map, LatLngBounds, latLngBounds } from 'leaflet/src/Leaflet.js';

export default {
  name: 'LMap',
  mixins: [Options],
  props: {
    center: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    bounds: {
      type: [Array, Object],
      custom: true,
      default: null
    },
    maxBounds: {
      type: [Array, Object],
      default: null
    },
    zoom: {
      type: Number,
      custom: true,
      default: 0
    },
    minZoom: {
      type: Number,
      default: null
    },
    maxZoom: {
      type: Number,
      default: null
    },
    paddingBottomRight: {
      type: Array,
      custom: true,
      default: null
    },
    paddingTopLeft: {
      type: Array,
      custom: true,
      default: null
    },
    padding: {
      type: Array,
      custom: true,
      default: null
    },
    worldCopyJump: {
      type: Boolean,
      default: false
    },
    crs: {
      type: Object,
      custom: true,
      default: () => CRS.EPSG3857
    },
    maxBoundsViscosity: {
      type: Number,
      default: null
    },
    inertia: {
      type: Boolean,
      default: null
    },
    inertiaDeceleration: {
      type: Number,
      default: null
    },
    inertiaMaxSpeed: {
      type: Number,
      default: null
    },
    easeLinearity: {
      type: Number,
      default: null
    },
    zoomAnimation: {
      type: Boolean,
      default: null
    },
    zoomAnimationThreshold: {
      type: Number,
      default: null
    },
    fadeAnimation: {
      type: Boolean,
      default: null
    },
    markerZoomAnimation: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      ready: false,
      lastSetCenter: null,
      lastSetBounds: null,
      lastSetZoom: null,
      layerControl: undefined,
      layersToAdd: []
    };
  },
  mounted () {
    const options = optionsMerger({
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      maxBounds: this.maxBounds,
      maxBoundsViscosity: this.maxBoundsViscosity,
      worldCopyJump: this.worldCopyJump,
      crs: this.crs,
      center: this.center,
      zoom: this.zoom,
      inertia: this.inertia,
      inertiaDeceleration: this.inertiaDeceleration,
      inertiaMaxSpeed: this.inertiaMaxSpeed,
      easeLinearity: this.easeLinearity,
      zoomAnimation: this.zoomAnimation,
      zoomAnimationThreshold: this.zoomAnimationThreshold,
      fadeAnimation: this.fadeAnimation,
      markerZoomAnimation: this.markerZoomAnimation
    }, this);
    this.mapObject = map(this.$el, options);
    this.setBounds(this.bounds);
    this.mapObject.on('moveend', debounce(this.moveEndHandler, 100));
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.$emit('leaflet:load');
  },
  methods: {
    registerLayerControl (lControlLayers) {
      this.layerControl = lControlLayers;
      this.mapObject.addControl(lControlLayers.mapObject);
      for (var layer in this.layersToAdd) {
        this.layerControl.addLayer(layer);
      }
      this.layersToAdd = [];
    },
    addLayer (layer, alreadyAdded) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd.push(layer);
        } else {
          this.layerControl.addLayer(layer);
        }
      }
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
    },
    removeLayer (layer, alreadyRemoved) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd = this.layersToAdd.filter((l) => l.name !== layer.name);
        } else {
          this.layerControl.removeLayer(layer);
        }
      }
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    },
    setZoom (newVal, oldVal) {
      this.mapObject.setZoom(newVal);
    },
    setCenter (newVal, oldVal) {
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
      center = { ...center };
      if (center.lat !== newLat || center.lng !== newLng) {
        center.lat = newVal.lat;
        center.lng = newVal.lng;
        this.lastSetCenter = center;
        this.mapObject.panTo(newVal);
      }
    },
    setBounds (newVal, oldVal) {
      if (!newVal) {
        return;
      }
      if (newVal instanceof LatLngBounds) {
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
      } else {
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
        newVal = latLngBounds(newVal);
      }
      southWestNewLat = newVal._southWest.lat;
      southWestNewLng = newVal._southWest.lng;
      northEastNewLat = newVal._northEast.lat;
      northEastNewLng = newVal._northEast.lng;
      let boundsChanged =
        (southWestNewLat !== southWestLat) ||
        (southWestNewLng !== southWestLng) ||
        (northEastNewLat !== northEastLat) ||
        (northEastNewLng !== northEastLng);
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
        } else {
          bounds._southWest.lat = southWestLat;
          bounds._southWest.lng = southWestLng;
          bounds._northEast.lat = northEastLat;
          bounds._northEast.lng = northEastLng;
        }
        this.mapObject.fitBounds(newVal, options);
      }
    },
    setPaddingBottomRight (newVal, oldVal) {
      this.paddingBottomRight = newVal;
    },
    setPaddingTopLeft (newVal, oldVal) {
      this.paddingTopLeft = newVal;
    },
    setPadding (newVal, oldVal) {
      this.padding = newVal;
    },
    setCrs (newVal, oldVal) {
      console.log('Changing CRS is not yet supported by Leaflet');
    },
    fitBounds (bounds) {
      this.mapObject.fitBounds(bounds);
    },
    moveEndHandler () {
      this.$emit('update:zoom', this.mapObject.getZoom());
      let center = this.mapObject.getCenter();
      this.$emit('update:center', center);
      let bounds = this.mapObject.getBounds();
      this.$emit('update:bounds', bounds);
    }
  }
};
</script>

<style type="text/css">
  .vue2leaflet-map {
    height: 100%;
    width: 100%;
  }
</style>
