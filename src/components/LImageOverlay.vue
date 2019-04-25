<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import ImageOverlayMixin from '../mixins/ImageOverlay.js';
import { imageOverlay, DomEvent } from 'leaflet';

export default {
  name: 'LImageOverlay',
  mixins: [ImageOverlayMixin],
  mounted () {
    const options = optionsMerger(this.imageOverlayOptions, this);
    this.mapObject = imageOverlay(this.url, this.bounds, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  render () {
    return null;
  }
};
</script>
