import ImageOverlay from './ImageOverlay.js';

export default {
  mixins: [ImageOverlay],
  mounted () {
    this.svgOverlayOptions = this.imageOverlayOptions;
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
