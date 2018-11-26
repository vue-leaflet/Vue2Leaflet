<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Popper from '../mixins/Popper.js';
import Options from '../mixins/Options.js';

export default {
  name: 'LTooltip',
  mixins: [Popper, Options],
  mounted () {
    const options = optionsMerger(this.popperOptions, this);
    this.mapObject = L.tooltip(options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy () {
    if (this.parentContainer) {
      this.parentContainer.unbindTooltip();
    }
  }
};
</script>
