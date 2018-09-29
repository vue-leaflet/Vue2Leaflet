export default {
  props: {
    pane: {
      type: String,
      default: 'overlayPane'
    },
    attribution: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    }
  },
  mounted () {
    this.layerOptions = {
      attribution: this.attribution,
      name: this.name,
      pane: this.pane
    };
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setAttribution (val, old) {
      let attributionControl = this.$parent.mapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setName (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
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
    }
  }
};
