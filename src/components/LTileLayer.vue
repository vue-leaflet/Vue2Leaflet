<template>
  <div />
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import TileLayerMixin from '../mixins/TileLayer.js';
import Options from '../mixins/Options.js';
import { tileLayer, DomEvent } from 'leaflet';

export default {
  name: 'LTileLayer',
  mixins: [TileLayerMixin, Options],
  props: {
    url: {
      type: String,
      default: null,
    },
    tileLayerClass: {
      type: Function,
      default: tileLayer,
    },
  },
  mounted() {
    const options = optionsMerger(this.tileLayerOptions, this);
    this.mapObject = this.tileLayerClass(this.url, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
};
</script>
