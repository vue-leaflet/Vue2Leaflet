<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import { DomEvent, divIcon, icon } from 'leaflet';

/**
 * Easy and reactive way to configure the icon of a marker
 */
export default {
  name: 'LIcon',
  props: {
    iconUrl: {
      type: String,
      custom: true,
      default: null,
    },
    iconRetinaUrl: {
      type: String,
      custom: true,
      default: null,
    },
    iconSize: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    iconAnchor: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    popupAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0],
    },
    tooltipAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0],
    },
    shadowUrl: {
      type: String,
      custom: true,
      default: null,
    },
    shadowRetinaUrl: {
      type: String,
      custom: true,
      default: null,
    },
    shadowSize: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    shadowAnchor: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    bgPos: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0],
    },
    className: {
      type: String,
      custom: true,
      default: '',
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      parentContainer: null,
      observer: null,
      recreationNeeded: false,
      swapHtmlNeeded: false,
    };
  },

  mounted() {
    this.parentContainer = findRealParent(this.$parent);

    propsBinder(this, this.$parent.mapObject, this.$options.props);

    this.observer = new MutationObserver(() => {
      this.scheduleHtmlSwap();
    });
    this.observer.observe(this.$el, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
    this.scheduleCreateIcon();
  },

  beforeDestroy() {
    if (this.parentContainer.mapObject) {
      this.parentContainer.mapObject.setIcon(this.parentContainer.$props.icon);
    }

    this.observer.disconnect();
  },

  methods: {
    scheduleCreateIcon() {
      this.recreationNeeded = true;

      this.$nextTick(this.createIcon);
    },

    scheduleHtmlSwap() {
      this.htmlSwapNeeded = true;

      this.$nextTick(this.createIcon);
    },

    createIcon() {
      // If only html of a divIcon changed, we can just replace the DOM without the need of recreating the whole icon
      if (
        this.htmlSwapNeeded &&
        !this.recreationNeeded &&
        this.iconObject &&
        this.parentContainer.mapObject.getElement()
      ) {
        this.parentContainer.mapObject.getElement().innerHTML = this.$el.innerHTML;

        this.htmlSwapNeeded = false;
        return;
      }

      if (!this.recreationNeeded) {
        return;
      }

      if (this.iconObject) {
        DomEvent.off(this.iconObject, this.$listeners);
      }

      const options = optionsMerger(
        {
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
          className: this.className,
          html: this.$el.innerHTML || this.html,
        },
        this
      );

      if (options.html) {
        this.iconObject = divIcon(options);
      } else {
        this.iconObject = icon(options);
      }

      DomEvent.on(this.iconObject, this.$listeners);

      this.parentContainer.mapObject.setIcon(this.iconObject);

      this.recreationNeeded = false;
      this.htmlSwapNeeded = false;
    },

    setIconUrl() {
      this.scheduleCreateIcon();
    },
    setIconRetinaUrl() {
      this.scheduleCreateIcon();
    },
    setIconSize() {
      this.scheduleCreateIcon();
    },
    setIconAnchor() {
      this.scheduleCreateIcon();
    },
    setPopupAnchor() {
      this.scheduleCreateIcon();
    },
    setTooltipAnchor() {
      this.scheduleCreateIcon();
    },
    setShadowUrl() {
      this.scheduleCreateIcon();
    },
    setShadowRetinaUrl() {
      this.scheduleCreateIcon();
    },
    setShadowAnchor() {
      this.scheduleCreateIcon();
    },
    setBgPos() {
      this.scheduleCreateIcon();
    },
    setClassName() {
      this.scheduleCreateIcon();
    },
    setHtml() {
      this.scheduleCreateIcon();
    },
  },

  render() {
    return null;
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="[47.413220, -1.219482]" > </l-marker>
      <l-marker
        :lat-lng="[47.413220, -1.209482]"
        :icon="icon" > </l-marker>
      <l-marker :lat-lng="[47.413220, -1.199482]">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="static/images/baseball-marker.png" >
        </l-icon>
      </l-marker>
      <l-marker :lat-lng="[47.413220, -1.189482]">
        <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
          <div class="headline">{{ customText }}</div>
          <img src="/images/layers.png">
        </l-icon>
      </l-marker>
  </l-map>
</template>

<script>
import L from 'leaflet';
import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482],
      icon: L.icon({
        iconUrl: '/images/baseball-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    };
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  }
}
</script>
:::
</docs>
