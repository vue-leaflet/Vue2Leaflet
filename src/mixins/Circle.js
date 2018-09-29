import Path from './Path';

export default {
  mixins: [Path],
  props: {
    radius: {
      type: Number,
      default: null
    }
  },
  mounted () {
    this.circleOptions = {
      ...this.pathOptions,
      radius: this.radius
    };
  }
};
