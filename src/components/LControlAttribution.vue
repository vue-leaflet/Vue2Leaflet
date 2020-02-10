<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

/**
 * Add any custom component as a leaflet control-attribution
 */
export default {
  name: 'LControlAttribution',
  mixins: [ControlMixin, Options],
  props: {
    prefix: {
      type: [String, Boolean],
      default: null,
    },
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.controlOptions,
        prefix: this.prefix,
      },
      this
    );
    this.mapObject = control.attribution(options);
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
    <l-control-attribution position="topright" prefix="A custom prefix"></l-control-attribution>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LControlAttribution} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlAttribution
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
