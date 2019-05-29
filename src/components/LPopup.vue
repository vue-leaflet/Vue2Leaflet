<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Popper from '../mixins/Popper.js';
import Options from '../mixins/Options.js';
import { popup, DomEvent } from 'leaflet';

export default {
  name: 'LPopup',
  mixins: [Popper, Options],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => []
    }
  },
  mounted () {
    const options = optionsMerger(this.popperOptions, this);
    this.mapObject = popup(options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindPopup(this.mapObject);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy () {
    if (this.parentContainer) {
      if (this.parentContainer.unbindPopup) {
        this.parentContainer.unbindPopup();
      } else if (this.parentContainer.mapObject && this.parentContainer.mapObject.unbindPopup) {
        this.parentContainer.mapObject.unbindPopup();
      }
    }
  }
};
</script>
