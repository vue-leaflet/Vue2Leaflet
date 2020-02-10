<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Popper from '../mixins/Popper.js';
import Options from '../mixins/Options.js';
import { popup, DomEvent } from 'leaflet';

/**
 * Display a popup on the map
 */
export default {
  name: 'LPopup',
  mixins: [Popper, Options],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => [],
    },
  },
  mounted() {
    const options = optionsMerger(this.popperOptions, this);
    this.mapObject = popup(options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindPopup(this.mapObject);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy() {
    if (this.parentContainer) {
      if (this.parentContainer.unbindPopup) {
        this.parentContainer.unbindPopup();
      } else if (
        this.parentContainer.mapObject &&
        this.parentContainer.mapObject.unbindPopup
      ) {
        this.parentContainer.mapObject.unbindPopup();
      }
    }
  },
};
</script>

<docs>
::: tip
Popup placed inside a marker will by default appear on marker click.
:::

## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng">
      <l-popup>Hello!</l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>
:::
</docs>
