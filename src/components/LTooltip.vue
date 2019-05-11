<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Popper from '../mixins/Popper.js';
import Options from '../mixins/Options.js';
import { tooltip, DomEvent } from 'leaflet';

export default {
  name: 'LTooltip',
  mixins: [Popper, Options],
  mounted () {
    const options = optionsMerger(this.popperOptions, this);
    this.mapObject = tooltip(options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy () {
    if (this.parentContainer) {
      if (this.parentContainer.unbindTooltip) {
        this.parentContainer.unbindTooltip();
      } else if (this.parentContainer.mapObject && this.parentContainer.mapObject.unbindTooltip) {
        this.parentContainer.mapObject.unbindTooltip();
      }
    }
  }
};
</script>
