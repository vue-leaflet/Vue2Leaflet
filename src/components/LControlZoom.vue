<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

/**
 * Add any custom component as a leaflet control-zoom
 */
export default {
  name: 'LControlZoom',
  mixins: [ControlMixin, Options],
  props: {
    zoomInText: {
      type: String,
      default: '+',
    },
    zoomInTitle: {
      type: String,
      default: 'Zoom in',
    },
    zoomOutText: {
      type: String,
      default: '-',
    },
    zoomOutTitle: {
      type: String,
      default: 'Zoom out',
    },
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.controlOptions,
        zoomInText: this.zoomInText,
        zoomInTitle: this.zoomInTitle,
        zoomOutText: this.zoomOutText,
        zoomOutTitle: this.zoomOutTitle,
      },
      this
    );
    this.mapObject = control.zoom(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  render() {
    return null;
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control-zoom position="bottomright"  ></l-control-zoom>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LControlZoom} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
    };
  }
}
</script>
:::
</docs>
