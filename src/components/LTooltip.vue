<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import Popper from '../mixins/Popper.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LTooltip',
  mixins: [Popper],
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(this.options, this.popperOptions)
    this.mapObject = L.tooltip(options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy () {
    if (this.parentContainer.mapObject && this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
    }
  }
};
</script>
