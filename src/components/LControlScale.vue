<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LControlScale',
  mixins: [Control],
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    maxWidth: {
      type: Number,
      default: undefined
    },
    metric: {
      type: Boolean,
      default: undefined
    },
    imperial: {
      type: Boolean,
      default: undefined
    },
    updateWhenIdle: {
      type: Boolean,
      default: undefined
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(
      this.options,
      this.controlOptions, {
        maxWidth: this.maxWidth,
        metric: this.metric,
        imperial: this.imperial,
        updateWhenIdle: this.updateWhenIdle
      });
    this.mapObject = L.control.scale(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
