import Layer from './Layer';

export default {
  mixins: [Layer],
  props: {
    pane: {
      type: String,
      default: 'tilePane'
    },
    opacity: {
      type: Number,
      custom: false,
      default: 1.0
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.gridLayerOptions = {
      ...this.layerOptions,
      pane: this.pane,
      opacity: this.opacity,
      zIndex: this.zIndex
    };
  }
};
