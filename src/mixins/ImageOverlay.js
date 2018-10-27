import Layer from './Layer.js';
import InteractiveLayer from './InteractiveLayer';

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
      default: 1.0
    },
    alt: {
      type: String,
      default: ''
    },
    interactive: {
      type: Boolean,
      default: false
    },
    crossOrigin: {
      type: Boolean,
      default: false
    },
    errorOverlayUrl: {
      type: String,
      custom: true,
      default: ''
    },
    zIndex: {
      type: Number,
      custom: true,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.imageOverlayOptions = {
      ...this.layerOptions,
      ...this.interactiveLayerOptions,
      opacity: this.opacity,
      alt: this.alt,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin,
      errorOverlayUrl: this.errorOverlayUrl,
      zIndex: this.zIndex,
      className: this.className
    };
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
