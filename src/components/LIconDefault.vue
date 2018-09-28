<script>
import propsBinder from '../utils/propsBinder.js';

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
    L.Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, this.$options.props);
  },
  methods: {
    setImagePath (newVal, oldVal) {
      L.Icon.Default.imagePath = newVal;
    }
  },
  render () {
    return null;
  }
};
</script>
