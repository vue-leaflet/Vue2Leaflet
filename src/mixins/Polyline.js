import Path from './Path';

export default {
  mixins: [Path],
  props: {
    smoothFactor: {
      type: Number,
      custom: true,
      default: 1.0
    },
    noClip: {
      type: Boolean,
      custom: true,
      default: false
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.polyLineOptions = {
      ...this.pathOptions,
      smoothFactor: this.smoothFactor,
      noClip: this.noClip
    };
  },
  methods: {
    setSmoothFactor (newVal) {
      this.mapObject.setStyle({ smoothFactor: newVal });
    },
    setNoClip (newVal) {
      this.mapObject.setStyle({ noClip: newVal });
    },
    addLatLng (value) {
      this.mapObject.addLatLng(value);
    }
  }
};
