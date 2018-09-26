import TileLayer from './TileLayer';

export default {
  mixins: [TileLayer],
  props: {
    layers: {
      type: String,
      default: ''
    },
    styles: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'image/jpeg'
    },
    transparent: {
      type: Boolean,
      custom: false
    },
    version: {
      type: String,
      default: '1.1.1'
    },
    crs: {
      default: null
    },
    upperCase: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.tileLayerWMSOptions = {
      ...this.tileLayerOptions,
      layers: this.layers,
      styles: this.styles,
      format: this.format,
      transparent: this.transparent,
      version: this.version,
      crs: this.crs,
      upperCase: this.upperCase
    };
  }
};
