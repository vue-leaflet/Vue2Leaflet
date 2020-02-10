<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

/**
 * Add any custom component as a leaflet control-scale
 */
export default {
  name: 'LControlScale',
  mixins: [ControlMixin, Options],
  props: {
    maxWidth: {
      type: Number,
      default: 100,
    },
    metric: {
      type: Boolean,
      default: true,
    },
    imperial: {
      type: Boolean,
      default: true,
    },
    updateWhenIdle: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.controlOptions,
        maxWidth: this.maxWidth,
        metric: this.metric,
        imperial: this.imperial,
        updateWhenIdle: this.updateWhenIdle,
      },
      this
    );
    this.mapObject = control.scale(options);
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
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control-scale position="topright" :imperial="true" :metric="false"></l-control-scale>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LControlScale} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlScale
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
