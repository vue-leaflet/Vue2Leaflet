import Layer from './Layer';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [Layer],
  props: {
    opacity: {
      type: Number,
      default: undefined
    },
    zIndex: {
      type: Number,
      default: undefined
    }
  },
  mounted () {
    this.gridLayerOptions = mergeIgnoreUndefined(
      this.layerOptions, {
        opacity: this.opacity,
        zIndex: this.zIndex
      });
  }
};
