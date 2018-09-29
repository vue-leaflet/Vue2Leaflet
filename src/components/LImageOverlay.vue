<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import ImageOverlay from '../mixins/ImageOverlay.js';

export default {
  name: 'LImageOverlay',
  mixins: [ImageOverlay],
  mounted () {
    this.mapObject = L.imageOverlay(this.url, this.bounds, this.imageOverlayOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
