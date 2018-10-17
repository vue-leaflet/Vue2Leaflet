import Layer from './Layer';

export default {
  mixins: [Layer],
  props: {
    layerType: {
      type: String,
      custom: true,
      default: null
    },
    name: {
      type: String,
      custom: true,
      default: null
    }
  },
  mounted () {
    this.layerGroupOptions = {
      ...this.layerOptions,
      name: this.name
    };
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
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    },
    setName (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    }
  }
};
