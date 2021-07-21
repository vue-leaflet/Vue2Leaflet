<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import SVGOverlayMixin from '../mixins/SVGOverlay.js';
import Options from '../mixins/Options.js';
import { svgOverlay, DomEvent } from 'leaflet';
/**
 * Easily display a svg overlay.
 */
export default {
  name: 'LSVGOverlay',
  mixins: [SVGOverlayMixin, Options],
  props: {
    svg: {
      type: [String, SVGElement],
      default: null
    }
  },
  mounted() {
    const options = optionsMerger(this.svgOverlayOptions, this);
    this.mapObject = svgOverlay(this.svg, this.bounds, options);
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
    <l-svg-overlay :svg="svg" :bounds="bounds"></l-svg-overlay>
  </l-map>
</template>

<script>
import {LMap, LSVGOverlay, LTileLayer} from 'vue2-leaflet';

const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
svgElement.setAttribute('viewBox', "0 0 200 200");
svgElement.innerHTML = `
  <rect width="200"
    height="200"/>
  <rect x="75"
    y="23"
    width="50"
    height="50"
    style="fill:red"/>
  <rect x="75"
    y="123"
    width="50"
    height="50"
    style="fill:#0013ff"/>`;

export default {
  components: {
    LMap,
    'l-svg-overlay': LSVGOverlay,
    LTileLayer
  },
  data () {
    return {
      zoom: 4,
      center: [25, -110],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      svg: svgElement,
      bounds: [[ 32, -130], [ 13, -100]]
    };
  }
}
</script>
:::
</docs>
