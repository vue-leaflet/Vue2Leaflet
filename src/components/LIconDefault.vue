<script>
import propsBinder from '../utils/propsBinder.js';
import { Icon } from 'leaflet/src/Leaflet.js';

export default {
  name: 'LIconDefault',
  props: {
    imagePath: {
      type: String,
      custom: true,
      default: ''
    }
  },
  mounted () {
    Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, this.$options.props);
  },
  methods: {
    setImagePath (newVal, oldVal) {
      Icon.Default.imagePath = newVal;
    }
  },
  render () {
    return null;
  }
};
</script>
