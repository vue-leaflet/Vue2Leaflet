<script>
import propsBinder from '../utils/propsBinder.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control.js';
import Options from '../mixins/Options.js';

export default {
  name: 'LControlZoom',
  mixins: [Control, Options],
  props: {
    zoomInText: {
      type: String,
      default: '+'
    },
    zoomInTitle: {
      type: String,
      default: 'Zoom in'
    },
    zoomOutText: {
      type: String,
      default: '-'
    },
    zoomOutTitle: {
      type: String,
      default: 'Zoom out'
    }
  },
  mounted () {
    const options = optionsMerger({
      ...this.controlOptions,
      zoomInText: this.zoomInText,
      zoomInTitle: this.zoomInTitle,
      zoomOutText: this.zoomOutText,
      zoomOutTitle: this.zoomOutTitle
    }, this);
    this.mapObject = L.control.zoom(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
