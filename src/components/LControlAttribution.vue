<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

export default {
  name: 'LControlAttribution',
  mixins: [ControlMixin, Options],
  props: {
    prefix: {
      type: [String, Boolean],
      default: null
    }
  },
  mounted () {
    const options = optionsMerger({
      ...this.controlOptions,
      prefix: this.prefix
    }, this);
    this.mapObject = control.attribution(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  render () {
    return null;
  }
};
</script>
