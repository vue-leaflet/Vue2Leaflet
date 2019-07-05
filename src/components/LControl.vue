<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { Control, DomEvent } from 'leaflet';

export default {
  name: 'LControl',
  mixins: [ControlMixin, Options],
  props: {
    disableClickPropagation: {
      type: Boolean,
      custom: true,
      default: true
    }
  },
  mounted () {
    const LControl = Control.extend({
      element: undefined,
      onAdd () {
        return this.element;
      },
      setElement (el) {
        this.element = el;
      }
    });
    const options = optionsMerger(this.controlOptions, this);
    this.mapObject = new LControl(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.setElement(this.$el);
    if (this.disableClickPropagation) {
      DomEvent.disableClickPropagation(this.$el);
    }
    this.mapObject.addTo(this.parentContainer.mapObject);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  }
};
</script>
