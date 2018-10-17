import Path from './Path';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [Path],
  props: {
    radius: {
      type: Number,
      default: undefined
    }
  },
  mounted () {
    this.circleOptions = mergeIgnoreUndefined(
      this.pathOptions, {
        radius: this.radius
      });
  }
};
