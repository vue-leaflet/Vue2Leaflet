import Layer from './Layer';

export default {
  mixins: [Layer],
  props: {
    layerType: {
      type: String,
      custom: true,
      default: null
    }
  },
  mounted () {
    this.layerGroupOptions = {...this.layerOptions};
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer (layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
      this.parentContainer.addLayer(layer, true);
    },
    removeLayer (layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
      this.parentContainer.removeLayer(layer, true);
    },
    setLayerType (newVal, oldVal) {
      console.warn('setLayerType has beed deprecated and is going to be removed on the next major version');
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    }
  }
};
