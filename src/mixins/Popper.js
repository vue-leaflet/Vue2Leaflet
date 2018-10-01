export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    },
    dynamic: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.popperOptions = { ...this.options };
  },
  methods: {
    setContent () {
      const node = this.$slots.default && this.dynamic ? this.$el : this.$el.cloneNode(true);
      this.mapObject.setContent(this.content || node);
    }
  },
  render: function (createElement) {
    if (this.$slots.default && (this.dynamic || !this.ready)) {
      return createElement('div', {}, this.$slots.default);
    }
    return null;
  }
};
