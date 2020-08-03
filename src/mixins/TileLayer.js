import GridLayer from './GridLayer';

export default {
  mixins: [GridLayer],
  props: {
    tms: {
      type: Boolean,
      default: false,
    },
    subdomains: {
      type: [String, Array],
      default: 'abc',
      validator: prop => {
        if (typeof prop === 'string') return true;
        // Validates array that array only contains only strings
        if (Array.isArray(prop)) {
          return prop.every(subdomain => typeof subdomain === 'string');
        }
        return false;
      },
    },
    detectRetina: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.tileLayerOptions = {
      ...this.gridLayerOptions,
      tms: this.tms,
      subdomains: this.subdomains,
      detectRetina: this.detectRetina,
    };
  },
  render() {
    return null;
  },
};
