<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import VideoOverlayMixin from '../mixins/VideoOverlay.js';
import Options from '../mixins/Options.js';
import { videoOverlay, DomEvent } from 'leaflet';

/**
 * Easily display a video overlay.
 */
export default {
  name: 'LVideoOverlay',
  mixins: [VideoOverlayMixin, Options],
  mounted() {
    const options = optionsMerger(this.videoOverlayOptions, this);
    this.mapObject = videoOverlay(this.url, this.bounds, options);
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
    <l-tile-layer :url="tilesUrl"></l-tile-layer>
    <l-video-overlay :url="videoUrl" :bounds="bounds"></l-video-overlay>
  </l-map>
</template>

<script>
import {LMap, LVideoOverlay, LTileLayer} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LVideoOverlay,
    LTileLayer
  },
  data () {
    return {
      zoom: 4,
      center: [25, -110],
      tilesUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      videoUrl: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
      bounds: [[ 32, -130], [ 13, -100]]
    };
  }
}
</script>
:::
</docs>
