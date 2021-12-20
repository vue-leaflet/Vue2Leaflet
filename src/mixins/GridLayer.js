import Layer from './Layer';

export default {
  mixins: [Layer],
  props: {
    pane: {
      type: String,
      default: 'tilePane',
    },
    opacity: {
      type: Number,
      custom: false,
      default: 1.0,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    tileSize: {
      type: [Number, Object, Array],
      default: 256,
    },
    noWrap: {
      type: Boolean,
      default: false,
    },
    minNativeZoom: {
      type: Number,
      default: undefined,
    },
    maxNativeZoom: {
      type: Number,
      default: undefined,
    },
  },
  mounted() {
    this.gridLayerOptions = {
      ...this.layerOptions,
      pane: this.pane,
      opacity: this.opacity,
      zIndex: this.zIndex,
      tileSize: this.tileSize,
      noWrap: this.noWrap,
      minNativeZoom: this.minNativeZoom,
      maxNativeZoom: this.maxNativeZoom,
    };
  },
};
