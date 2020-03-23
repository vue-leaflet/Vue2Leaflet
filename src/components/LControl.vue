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

/**
 * Add any custom component as a leaflet control
 */
export default {
  name: 'LControl',
  mixins: [ControlMixin, Options],
  props: {
    disableClickPropagation: {
      type: Boolean,
      custom: true,
      default: true,
    },
    disableScrollPropagation: {
      type: Boolean,
      custom: true,
      default: false,
    }
  },
  mounted() {
    const LControl = Control.extend({
      element: undefined,
      onAdd() {
        return this.element;
      },
      setElement(el) {
        this.element = el;
      },
    });
    const options = optionsMerger(this.controlOptions, this);
    this.mapObject = new LControl(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.setElement(this.$el);
    if (this.disableClickPropagation) {
      DomEvent.disableClickPropagation(this.$el);
    }
    if (this.disableScrollPropagation) {
      DomEvent.disableScrollPropagation(this.$el);
    }
    this.mapObject.addTo(this.parentContainer.mapObject);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control position="bottomleft" >
      <button @click="clickHandler">
        I am a useless button!
      </button>
    </l-control>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LControl} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControl
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482]
    };
  },
  methods: {
    clickHandler () {
      window.alert('and mischievous')
    }
  }
}
</script>
:::
</docs>
