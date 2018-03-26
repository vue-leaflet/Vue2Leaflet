<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
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
  sortLayers: {
    type: Boolean,
    default: false
  },
  sortFunction: {
    type: Function,
    default: undefined
  },
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'LControlLayers',
  props: props,
  mounted() {
    const options = this.options;
    const otherPropertytoInitialize = [ 'collapsed', 'autoZIndex', 'hideSingleBase', 'sortLayers', 'sortFunction'];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.control.layers(null, null, options);
    propsBinder(this, this.mapObject, props);
    this.$parent.registerLayerControl(this);
  },
  methods: {
    addLayer(layer) {
      if (layer.layerType == 'base') {
        this.mapObject.addBaseLayer(layer.mapObject, layer.name);
      } else if (layer.layerType == 'overlay') {
        this.mapObject.addOverlay(layer.mapObject, layer.name);
      }
    },
    removeLayer(layer) {
      this.mapObject.removeLayer(layer.mapObject);
    },
  },
  beforeDestroy() {
    this.mapObject.remove();
  },
  render() {
    return null;
  }
};
</script>
