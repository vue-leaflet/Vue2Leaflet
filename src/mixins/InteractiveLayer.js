export default {
  props: {
    interactive: {
      type: Boolean,
      default: true
    },
    bubblingMouseEvents: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.interactiveLayerOptions = {
      interactive: this.interactive,
      bubblingMouseEvents: this.bubblingMouseEvents
    };
  }
};
