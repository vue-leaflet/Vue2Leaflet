import Path from './Path';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [Path],
  props: {
    smoothFactor: {
      type: Number,
      custom: true,
      default: undefined
    },
    noClip: {
      type: Boolean,
      custom: true,
      default: undefined
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.polyLineOptions = mergeIgnoreUndefined(
      this.pathOptions, {
        smoothFactor: this.smoothFactor,
        noClip: this.noClip
      });
  },
  methods: {
    setSmoothFactor (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ smoothFactor: newVal });
      }
    },
    setNoClip (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ noClip: newVal });
      }
    },
    addLatLng (value) {
      this.mapObject.addLatLng(value);
    }
  }
};
