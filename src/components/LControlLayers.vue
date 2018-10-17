<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LControlLayers',
  mixins: [Control],
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    collapsed: {
      type: Boolean,
      default: undefined
    },
    autoZIndex: {
      type: Boolean,
      default: undefined
    },
    hideSingleBase: {
      type: Boolean,
      default: undefined
    },
    sortLayers: {
      type: Boolean,
      default: undefined
    },
    sortFunction: {
      type: Function,
      default: undefined
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(
      this.options,
      this.controlOptions, {
        collapsed: this.collapsed,
        autoZIndex: this.autoZIndex,
        hideSingleBase: this.hideSingleBase,
        sortLayers: this.sortLayers,
        sortFunction: this.sortFunction
      });
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
