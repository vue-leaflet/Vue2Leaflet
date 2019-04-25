<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

export default {
  name: 'LControlLayers',
  mixins: [ControlMixin, Options],
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
    this.mapObject = control.layers(null, null, options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.$parent.registerLayerControl(this);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
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
