<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control.js';

export default {
  name: 'LControlScale',
  mnixins: [Control],
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
    this.controlScaleOptions = {
      ...this.controlOptions,
      maxWidth: this.maxWidth,
      metric: this.metric,
      imperial: this.imperial,
      updateWhenIdle: this.updateWhenIdle
    };
    this.mapObject = L.control.scale(this.controlScaleOptions);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
