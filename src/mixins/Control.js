export default {
  props: {
    position: {
      type: String,
      default: 'topright'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.controlOptions = {
      ...this.options,
      position: this.position
    };
  },
  beforeDestroy () {
    if (this.mapObject) {
      this.mapObject.remove();
    }
  }
};
