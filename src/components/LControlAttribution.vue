<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control';
import Options from '../mixins/Options.js';

export default {
  name: 'LControlAttribution',
  mixins: [Control, Options],
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
