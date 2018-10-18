<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import TileLayerWMS from '../mixins/TileLayerWMS.js';

export default {
  name: 'LWMSTileLayer',
  mixins: [TileLayerWMS],
  props: {
    baseUrl: {
      type: String,
      default: null
    }
  },
  mounted () {
    const options = optionsMerger(this.tileLayerWMSOptions, this);
    this.mapObject = L.tileLayer.wms(this.baseUrl, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
