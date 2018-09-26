<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control.js';

export default {
  name: 'LControlLayers',
  mnixins: [Control],
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
    this.controlLayersOptions = {
      ...this.controlOptions,
      collapsed: this.collapsed,
      autoZIndex: this.autoZIndex,
      hideSingleBase: this.hideSingleBase,
      sortLayers: this.sortLayers,
      sortFunction: this.sortFunction
    };
    this.mapObject = L.control.layers(null, null, this.controlLayersOptions);
    propsBinder(this, this.mapObject, props);
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
