import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  props: {
    interactive: {
      type: Boolean,
      default: undefined
    },
    bubblingMouseEvents: {
      type: Boolean,
      default: undefined
    }
  },
  mounted () {
    this.interactiveLayerOptions = mergeIgnoreUndefined(
      {
        interactive: this.interactive,
        bubblingMouseEvents: this.bubblingMouseEvents
      });
  }
};
