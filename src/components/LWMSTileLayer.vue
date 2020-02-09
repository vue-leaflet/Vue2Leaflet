<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import TileLayerWMS from '../mixins/TileLayerWMS.js';
import Options from '../mixins/Options.js';
import { tileLayer, DomEvent } from 'leaflet';

export default {
  name: 'LWMSTileLayer',
  mixins: [TileLayerWMS, Options],
  props: {
    baseUrl: {
      type: String,
      default: null,
    },
  },
  mounted() {
    const options = optionsMerger(this.tileLayerWMSOptions, this);
    this.mapObject = tileLayer.wms(this.baseUrl, options);
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
