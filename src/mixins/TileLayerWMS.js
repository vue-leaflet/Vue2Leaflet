import TileLayer from './TileLayer';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [TileLayer],
  props: {
    layers: {
      type: String,
      default: undefined
    },
    styles: {
      type: String,
      default: undefined
    },
    format: {
      type: String,
      default: undefined
    },
    transparent: {
      type: Boolean,
      default: undefined
    },
    version: {
      type: String,
      default: undefined
    },
    crs: {
      default: undefined
    },
    upperCase: {
      type: Boolean,
      default: undefined
    }
  },
  mounted () {
    this.tileLayerWMSOptions = mergeIgnoreUndefined(
      this.tileLayerOptions, {
        layers: this.layers,
        styles: this.styles,
        format: this.format,
        transparent: this.transparent,
        version: this.version,
        crs: this.crs,
        upperCase: this.upperCase
      });
  }
};
