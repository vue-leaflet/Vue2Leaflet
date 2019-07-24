<template>
  <div class="vue2leaflet-map">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, debounce } from '../utils/utils.js';
import Options from '../mixins/Options.js';
import { CRS, DomEvent, map, latLngBounds, latLng } from 'leaflet';

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
    },
    noBlockingAnimations: {
      type: Boolean,
      default: false
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
  computed: {
    fitBoundsOptions () {
      const options = {};
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
      return options;
    }
  },
  beforeDestroy () {
    if (this.mapObject) {
      this.mapObject.remove();
    }
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
    // DEPRECATED leaflet:load
    this.$emit('leaflet:load');
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  methods: {
    registerLayerControl (lControlLayers) {
      this.layerControl = lControlLayers;
      this.mapObject.addControl(lControlLayers.mapObject);
      this.layersToAdd.forEach(layer => {
        this.layerControl.addLayer(layer);
      });
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
      this.mapObject.setZoom(newVal, {
        animate: !this.noBlockingAnimations ? false : null
      });
    },
    setCenter (newVal, oldVal) {
      if (newVal == null) {
        return;
      }
      const newCenter = latLng(newVal);
      const oldCenter = this.lastSetCenter || this.mapObject.getCenter();
      if (oldCenter.lat !== newCenter.lat ||
        oldCenter.lng !== newCenter.lng) {
        this.lastSetCenter = newCenter;
        this.mapObject.panTo(newCenter, {
          animate: !this.noBlockingAnimations ? false : null
        });
      }
    },
    setBounds (newVal, oldVal) {
      if (!newVal) {
        return;
      }
      const newBounds = latLngBounds(newVal);
      if (!newBounds.isValid()) {
        return;
      }
      const oldBounds = this.lastSetBounds || this.mapObject.getBounds();
      const boundsChanged = !oldBounds.equals(newBounds, 0); // set maxMargin to 0 - check exact equals
      if (boundsChanged) {
        this.lastSetBounds = newBounds;
        this.mapObject.fitBounds(newBounds, this.fitBoundsOptions);
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
