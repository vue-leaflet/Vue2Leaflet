<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import TileLayerWMS from '../mixins/TileLayerWMS.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LWMSTileLayer',
  mixins: [TileLayerWMS],
  props: {
    baseUrl: {
      type: String,
      default: undefined
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(this.options, this.tileLayerWMSOptions)
    this.mapObject = L.tileLayer.wms(this.baseUrl, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
