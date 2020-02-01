import GridLayer from './GridLayer';

export default {
  mixins: [GridLayer],
  props: {
    tms: {
      type: Boolean,
      default: false
    },
    subdomains: {
      type: String,
      default: 'abc'
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
      subdomains: this.subdomains,
      detectRetina: this.detectRetina
    };
  },
  render () {
    return null;
  }
};
