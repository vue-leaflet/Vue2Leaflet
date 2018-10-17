<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control.js';

export default {
  name: 'LControlLayers',
  mixins: [Control],
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    hideSingleBase: {
      type: Boolean,
      default: false
    },
    sortLayers: {
      type: Boolean,
      default: false
    },
    sortFunction: {
      type: Function,
      default: undefined
    }
  },
  mounted () {
    const options = optionsMerger({
      ...this.controlOptions,
      collapsed: this.collapsed,
      autoZIndex: this.autoZIndex,
      hideSingleBase: this.hideSingleBase,
      sortLayers: this.sortLayers,
      sortFunction: this.sortFunction
    }, this);
    this.mapObject = L.control.layers(null, null, options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.$parent.registerLayerControl(this);
  },
  methods: {
    addLayer (layer) {
      if (layer.layerType === 'base') {
        this.mapObject.addBaseLayer(layer.mapObject, layer.name);
      } else if (layer.layerType === 'overlay') {
        this.mapObject.addOverlay(layer.mapObject, layer.name);
      }
    },
    removeLayer (layer) {
      this.mapObject.removeLayer(layer.mapObject);
    }
  },
  render () {
    return null;
  }
};
</script>
