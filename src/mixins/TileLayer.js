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
      custom: false,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    },
    layerType: {
      type: String,
      default: undefined
    }
  },
  mounted () {
    this.tileLayerOptions = {
      ...this.gridLayerOptions,
      ...this.options,
      tms: this.tms,
      detectRetina: this.detectRetina
    };
  },
  render () {
    return null;
  }
};
