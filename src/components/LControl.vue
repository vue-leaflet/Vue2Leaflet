<template>
  <div>
    <slot />
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { Control } from 'leaflet';

export default {
  name: 'LControl',
  mixins: [ControlMixin, Options],
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
    this.mapObject.addTo(this.parentContainer.mapObject);
  }
};
</script>
