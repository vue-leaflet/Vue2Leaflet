<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Options from '../mixins/Options.js';

export default {
  name: 'LIcon',
  mixins: [Options],
  props: {
    iconUrl: String,
    iconRetinaUrl: String,
    iconSize: [Object, Array],
    iconAnchor: [Object, Array],
    popupAnchor: [Object, Array],
    tooltipAnchor: [Object, Array],
    shadowUrl: String,
    shadowRetinaUrl: String,
    shadowSize: [Object, Array],
    shadowAnchor: [Object, Array],
    bgPos: [Object, Array],
    className: String
  },

  data() {
    return {
      observer: null
    }
  },

  mounted () {
    const options = optionsMerger({
      iconUrl: this.iconUrl,
      iconRetinaUrl: this.iconRetinaUrl,
      iconSize: this.iconSize,
      iconAnchor: this.iconAnchor,
      popupAnchor: this.popupAnchor,
      tooltipAnchor: this.tooltipAnchor,
      shadowUrl: this.shadowUrl,
      shadowRetinaUrl: this.shadowRetinaUrl,
      shadowSize: this.shadowSize,
      shadowAnchor: this.shadowAnchor,
      bgPos: this.bgPos,
      className: this.className
    }, this);

    this.watchProps(options);
    this.watchSlot(options);

    this.createIcon(options);
  },

  beforeDestroy () {
    if (this.parentContainer.mapObject) {
      this.parentContainer.mapObject.setIcon(null);
    }

    this.observer.disconnect();
  },

  render() {
    return null;
  },

  methods: {
    createIcon(options) {
      if (this.iconObject) {
        L.DomEvent.off(this.iconObject, this.$listeners);
      }

      options.html = this.$el.innerHTML;

      if (options.html) {
        this.iconObject = L.divIcon(options);
      } else {
        this.iconObject = L.icon(options);
      }

      L.DomEvent.on(this.iconObject, this.$listeners);

      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.mapObject.setIcon(this.iconObject);
    },

    watchProps(options) {
      const props = this.$options.props;
      const keys = Object.keys(props);

      for (let i = 0; i < keys.length; i++) {
        this.$watch(keys[i], (newVal, oldVal) => {
          //TODO: why is watch triggered on foreign props when changing icon size in my example?
          if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
            return;
          }

          options[keys[i]] = newVal;
          this.createIcon(options);
        }, {
          deep: props[keys[i]].type === Object
        });
      }
    },

    watchSlot(options) {
      this.observer = new MutationObserver(() => {
        this.createIcon(options);
      });

      this.observer.observe(
        this.$el,
        { attributes: true, childList: true, characterData: true, subtree: true }
      );
    }
  }
};
</script>
