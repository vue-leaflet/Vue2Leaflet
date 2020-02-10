<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Popper from '../mixins/Popper.js';
import Options from '../mixins/Options.js';
import { tooltip, DomEvent } from 'leaflet';
/**
 * Display a tooltip on the map
 */
export default {
  name: 'LTooltip',
  mixins: [Popper, Options],
  mounted() {
    const options = optionsMerger(this.popperOptions, this);
    this.mapObject = tooltip(options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
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
      if (this.parentContainer.unbindTooltip) {
        this.parentContainer.unbindTooltip();
      } else if (
        this.parentContainer.mapObject &&
        this.parentContainer.mapObject.unbindTooltip
      ) {
        this.parentContainer.mapObject.unbindTooltip();
      }
    }
  },
};
</script>

<docs>
::: tip
Tooltip placed inside a marker will by default appear on marker hover.
:::

## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng">
      <l-tooltip>Hello!</l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LTooltip} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
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
