<template>
  <div class="vue2leaflet-map">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, debounce } from '../utils/utils.js';
import Options from '../mixins/Options.js';
import { CRS, DomEvent, map, latLngBounds, latLng } from 'leaflet';

/**
 * Base component, contains and wrap all the other components.
 */
export default {
  name: 'LMap',
  mixins: [Options],
  props: {
    /**
     * The center of the map, supports .sync modifier
     */
    center: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0],
    },
    /**
     * The bounds of the map, supports .sync modifier
     */
    bounds: {
      type: [Array, Object],
      custom: true,
      default: null,
    },
    /**
     * The max bounds of the map
     */
    maxBounds: {
      type: [Array, Object],
      default: null,
    },
    /**
     * The zoom of the map, supports .sync modifier
     */
    zoom: {
      type: Number,
      custom: true,
      default: 0,
    },
    /**
     * The minZoom of the map
     */
    minZoom: {
      type: Number,
      default: null,
    },
    /**
     * The maxZoom of the map
     */
    maxZoom: {
      type: Number,
      default: null,
    },
    /**
     * The paddingBottomRight of the map
     */
    paddingBottomRight: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The paddingTopLeft of the map
     */
    paddingTopLeft: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The padding of the map
     */
    padding: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The worldCopyJump option for the map
     */
    worldCopyJump: {
      type: Boolean,
      default: false,
    },
    /**
     * The crs option for the map
     * @values CRS.EPSG3857
     */
    crs: {
      type: Object,
      custom: true,
      default: () => CRS.EPSG3857,
    },
    maxBoundsViscosity: {
      type: Number,
      default: null,
    },
    inertia: {
      type: Boolean,
      default: null,
    },
    inertiaDeceleration: {
      type: Number,
      default: null,
    },
    inertiaMaxSpeed: {
      type: Number,
      default: null,
    },
    easeLinearity: {
      type: Number,
      default: null,
    },
    zoomAnimation: {
      type: Boolean,
      default: null,
    },
    zoomAnimationThreshold: {
      type: Number,
      default: null,
    },
    fadeAnimation: {
      type: Boolean,
      default: null,
    },
    markerZoomAnimation: {
      type: Boolean,
      default: null,
    },
    noBlockingAnimations: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ready: false,
      lastSetCenter: this.center ? latLng(this.center) : null,
      lastSetBounds: this.bounds ? latLngBounds(this.bounds) : null,
      layerControl: undefined,
      layersToAdd: [],
      layersInControl: [],
    };
  },
  computed: {
    fitBoundsOptions() {
      const options = {
        animate: this.noBlockingAnimations ? false : null,
      };
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
    },
  },
  beforeDestroy() {
    if (this.debouncedMoveEndHandler) {
      this.debouncedMoveEndHandler.cancel();
    }

    if (this.mapObject) {
      this.mapObject.remove();
    }
  },
  mounted() {
    const options = optionsMerger(
      {
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
        markerZoomAnimation: this.markerZoomAnimation,
      },
      this
    );
    this.mapObject = map(this.$el, options);
    if (this.bounds) {
      this.mapObject.fitBounds(this.bounds);
    }
    this.debouncedMoveEndHandler = debounce(this.moveEndHandler, 100);
    this.mapObject.on('moveend', this.debouncedMoveEndHandler);
    this.mapObject.on('overlayadd', this.overlayAddHandler);
    this.mapObject.on('overlayremove', this.overlayRemoveHandler);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    /**
     * DEPRECATED event
     * @deprecated
     */
    this.$emit('leaflet:load');
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  methods: {
    registerLayerControl(lControlLayers) {
      this.layerControl = lControlLayers;
      this.mapObject.addControl(lControlLayers.mapObject);
      this.layersToAdd.forEach(layer => {
        this.layerControl.addLayer(layer);
      });
      this.layersToAdd = [];
    },
    addLayer(layer, alreadyAdded) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd.push(layer);
        } else {
          const exist = this.layersInControl.find(
            l => l.mapObject._leaflet_id === layer.mapObject._leaflet_id
          );
          if (!exist) {
            this.layerControl.addLayer(layer);
            this.layersInControl.push(layer);
          }
        }
      }
      if (!alreadyAdded && layer.visible !== false) {
        this.mapObject.addLayer(layer.mapObject);
      }
    },
    hideLayer(layer) {
      this.mapObject.removeLayer(layer.mapObject);
    },
    removeLayer(layer, alreadyRemoved) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd = this.layersToAdd.filter(
            l => l.name !== layer.name
          );
        } else {
          this.layerControl.removeLayer(layer);
          this.layersInControl = this.layersInControl.filter(
            l => l.mapObject._leaflet_id !== layer.mapObject._leaflet_id
          );
        }
      }
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    },
    setZoom(newVal, oldVal) {
      if (newVal === undefined || newVal === null) { return; }
      this.mapObject.setZoom(newVal, {
        animate: this.noBlockingAnimations ? false : null,
      });
      this.cacheMapView();
    },
    setCenter(newVal, oldVal) {
      if (newVal == null) {
        return;
      }
      const newCenter = latLng(newVal);
      const oldCenter = this.lastSetCenter || this.mapObject.getCenter();
      if (oldCenter.lat !== newCenter.lat || oldCenter.lng !== newCenter.lng) {
        this.lastSetCenter = newCenter;
        this.mapObject.panTo(newCenter, {
          animate: this.noBlockingAnimations ? false : null,
        });
        this.cacheMapView(undefined, newCenter);
      }
    },
    setBounds(newVal, oldVal) {
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
        this.mapObject.fitBounds(newBounds, this.fitBoundsOptions);
        this.cacheMapView(newBounds);
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
      const mapObject = this.mapObject,
        prevBounds = mapObject.getBounds();
      mapObject.options.crs = newVal;
      mapObject.fitBounds(prevBounds, { animate: false, padding: [0, 0] });
    },
    fitBounds(bounds) {
      this.mapObject.fitBounds(bounds, {
        animate: this.noBlockingAnimations ? false : null,
      });
    },
    moveEndHandler() {
      /**
       * Triggers when zoom is updated
       * @type {number,string}
       */
      this.$emit('update:zoom', this.mapObject.getZoom());
      const center = this.mapObject.getCenter();
      /**
       * Triggers when center is updated
       * @type {object,array}
       */
      this.$emit('update:center', center);
      const bounds = this.mapObject.getBounds();
      /**
       * Triggers when bounds are updated
       * @type {object}
       */
      this.$emit('update:bounds', bounds);
    },
    overlayAddHandler(e) {
      const layer = this.layersInControl.find(l => l.name === e.name);
      if (layer) {
        layer.updateVisibleProp(true);
      }
    },
    overlayRemoveHandler(e) {
      const layer = this.layersInControl.find(l => l.name === e.name);
      if (layer) {
        layer.updateVisibleProp(false);
      }
    },
    cacheMapView(bounds, center) {
      // Cache the last values used to define the map view by mutating props.
      this.lastSetBounds = bounds || this.mapObject.getBounds();
      this.lastSetCenter = center || this.lastSetBounds.getCenter();
    },
  },
};
</script>

<style type="text/css">
.vue2leaflet-map {
  height: 100%;
  width: 100%;
}
</style>

<docs>
::: tip
If your markup does not have a root `<l-map>` something is wrong.
:::

## Demo
::: demo
<template>
  <div style="height: 350px;">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>
:::
</docs>
