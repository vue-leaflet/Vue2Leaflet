import GridLayer from './GridLayer';

export default {
  mixins: [GridLayer],
  props: {
    tms: {
      type: Boolean,
      default: false
    },
    detectRetina: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.tileLayerOptions = {
      ...this.gridLayerOptions,
      tms: this.tms,
      detectRetina: this.detectRetina
    };
  },
  render () {
    return null;
  }
};
