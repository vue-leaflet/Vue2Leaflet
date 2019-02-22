import Path from './Path';

export default {
  mixins: [Path],
  props: {
    fill: {
      type: Boolean,
      custom: true,
      default: true
    },
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
