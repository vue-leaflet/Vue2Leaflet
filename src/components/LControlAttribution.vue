<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control';

export default {
  name: 'LControlAttribution',
  mixins: [Control],
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
    this.mapObject = L.control.attribution(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
