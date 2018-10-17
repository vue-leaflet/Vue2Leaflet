import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  props: {
    pane: {
      type: String,
      default: undefined
    },
    attribution: {
      type: String,
      default: undefined
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    },
    layerType: {
      type: String,
      custom: true,
      default: undefined
    },
    name: {
      type: String,
      custom: true,
      default: undefined
    }
  },
  mounted () {
    this.layerOptions = mergeIgnoreUndefined({
      pane: this.pane,
      attribution: this.attribution
    });
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setAttribution (val, old) {
      let attributionControl = this.$parent.mapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
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
