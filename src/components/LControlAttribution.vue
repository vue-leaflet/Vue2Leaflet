<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import ControlMixin from '../mixins/Control';
import Options from '../mixins/Options.js';
import { control } from 'leaflet/src/Leaflet.js';

export default {
  name: 'LControlAttribution',
  mixins: [ControlMixin, Options],
  props: {
    prefix: {
      type: String,
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
  },
  render () {
    return null;
  }
};
</script>
