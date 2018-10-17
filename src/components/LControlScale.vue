<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control.js';

export default {
  name: 'LControlScale',
  mixins: [Control],
  props: {
    maxWidth: {
      type: Number,
      default: 100
    },
    metric: {
      type: Boolean,
      default: true
    },
    imperial: {
      type: Boolean,
      default: true
    },
    updateWhenIdle: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const options = optionsMerger({
      ...this.controlOptions,
      maxWidth: this.maxWidth,
      metric: this.metric,
      imperial: this.imperial,
      updateWhenIdle: this.updateWhenIdle
    }, this.options);
    this.mapObject = L.control.scale(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
