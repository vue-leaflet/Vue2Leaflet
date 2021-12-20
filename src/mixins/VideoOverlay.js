import ImageOverlay from './ImageOverlay.js';

export default {
  mixins: [ImageOverlay],
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    keepAspectRatio: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.videoOverlayOptions = {
      ...this.imageOverlayOptions,
      autoplay: this.autoplay,
      loop: this.loop,
      keepAspectRatio: this.keepAspectRatio,
      muted: this.muted
    };
  },
  methods: {
    getElement () {
      return this.mapObject.getElement();
    }
  },
  render () {
    return null;
  }
};
