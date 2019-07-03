<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import CircleMixin from '../mixins/Circle.js';
import { circle, DomEvent } from 'leaflet';

export default {
  name: 'LCircle',
  mixins: [CircleMixin],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => [0, 0]
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = optionsMerger(this.circleOptions, this);
    this.mapObject = circle(this.latLng, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  methods: {}
};
</script>
