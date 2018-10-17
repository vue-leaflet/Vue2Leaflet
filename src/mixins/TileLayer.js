import GridLayer from './GridLayer';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [GridLayer],
  props: {
    tms: {
      type: Boolean,
      default: undefined
    },
    detectRetina: {
      type: Boolean,
      default: undefined
    }
  },
  mounted () {
    this.tileLayerOptions = mergeIgnoreUndefined(
      this.gridLayerOptions, {
        tms: this.tms,
        detectRetina: this.detectRetina
      });
  },
  render () {
    return null;
  }
};
