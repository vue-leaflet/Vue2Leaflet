<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import ImageOverlayMixin from '../mixins/ImageOverlay.js';
import Options from '../mixins/Options.js';
import { imageOverlay, DomEvent } from 'leaflet';

/**
 * Easily display a image overlay.
 */
export default {
  name: 'LImageOverlay',
  mixins: [ImageOverlayMixin, Options],
  mounted() {
    const options = optionsMerger(this.imageOverlayOptions, this);
    this.mapObject = imageOverlay(this.url, this.bounds, options);
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
  <l-map style="height: 350px" :crs="crs" :options="{zoomControl: false}">
    <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
    <l-marker v-for="star in stars" :lat-lng="star" :key="star.name">
      <l-popup :content="star.name"/>
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LImageOverlay, LMarker, LPopup} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'http://leafletjs.com/examples/crs-simple/uqm_map_full.png',
      bounds: [[-26.5, -25], [1021.5, 1023]],
      crs: L.CRS.Simple,
      stars: [
        { name: 'Sol', lng: 175.2, lat: 145.0 },
        { name: 'Mizar', lng: 41.6, lat: 130.1 },
        { name: 'Krueger-Z', lng: 13.4, lat: 56.5 },
        { name: 'Deneb', lng: 218.7, lat: 8.3 }
      ]
    };
  }
}
</script>
:::
</docs>
