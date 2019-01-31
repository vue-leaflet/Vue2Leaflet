<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import ImageOverlayMixin from '../mixins/ImageOverlay.js';
import { imageOverlay, DomEvent } from 'leaflet/src/Leaflet.js';

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
  },
  render () {
    return null;
  }
};
</script>
