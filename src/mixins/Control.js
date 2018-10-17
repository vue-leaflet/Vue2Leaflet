import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  props: {
    position: {
      type: String,
      default: undefined
    }
  },
  mounted () {
    this.controlOptions = mergeIgnoreUndefined({
      position: this.position
    });
  },
  beforeDestroy () {
    if (this.mapObject) {
      this.mapObject.remove();
    }
  }
};
