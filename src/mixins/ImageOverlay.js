import Layer from './Layer.js';
import InteractiveLayer from './InteractiveLayer';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [Layer, InteractiveLayer],
  props: {
    url: {
      type: String,
      custom: true
    },
    bounds: {
      custom: true
    },
    opacity: {
      type: Number,
      custom: true,
      default: undefined
    },
    alt: {
      type: String,
      default: undefined
    },
    crossOrigin: {
      type: Boolean,
      default: undefined
    },
    errorOverlayUrl: {
      type: String,
      custom: true,
      default: undefined
    },
    zIndex: {
      type: Number,
      custom: true,
      default: undefined
    },
    className: {
      type: String,
      default: undefined
    }
  },
  mounted () {
    this.imageOverlayOptions = mergeIgnoreUndefined(
      this.layerOptions,
      this.interactiveLayerOptions, {
        opacity: this.opacity,
        alt: this.alt,
        crossOrigin: this.crossOrigin,
        errorOverlayUrl: this.errorOverlayUrl,
        zIndex: this.zIndex,
        className: this.className
      });
  },
  methods: {
    setOpacity (opacity) {
      return this.mapObject.setOpacity(opacity);
    },
    setUrl (url) {
      return this.mapObject.setUrl(url);
    },
    setBounds (bounds) {
      return this.mapObject.setBounds(bounds);
    },
    getBounds () {
      return this.mapObject.getBounds();
    },
    getElement () {
      return this.mapObject.getElement();
    },
    bringToFront () {
      return this.mapObject.bringToFront();
    },
    bringToBack () {
      return this.mapObject.bringToBack();
    }
  },
  render () {
    return null;
  }
};
