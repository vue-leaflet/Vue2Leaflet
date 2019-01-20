<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

export default {
  name: 'LControlScale',
  mixins: [ControlMixin, Options],
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
    }, this);
    this.mapObject = control.scale(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
