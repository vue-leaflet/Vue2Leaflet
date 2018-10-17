<template>
  <div/>
</template>

<script>
import L from 'leaflet';
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import TileLayer from '../mixins/TileLayer.js';

export default {
  name: 'LTileLayer',
  mixins: [TileLayer],
  props: {
    url: {
      type: String,
      default: null
    },
    tileLayerClass: {
      type: Function,
      default: L.tileLayer
    }
  },
  mounted () {
    const options = optionsMerger(this.tileLayerOptions, this);
    this.mapObject = this.tileLayerClass(this.url, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
