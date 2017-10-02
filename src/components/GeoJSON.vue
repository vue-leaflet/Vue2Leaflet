<template></template>

<script>

export default {
  props: ['geojson', 'options'],
  mounted() {
    this.mapObject = L.geoJSON(this.geojson, this.options);

    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  watch: {
    geojson: {
      handler(newVal) {
        this.mapObject.clearLayers()
        this.addGeoJSONData(newVal);
      },
      deep: true,
    },
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent;
      this.mapObject.addTo(parent);
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(parent);
      }
    },
    addGeoJSONData(geojsonData) {
      this.mapObject.addData(geojsonData);
    },
    getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parent);
      } else {
        this.parent.removeLayer(this.mapObject);
      }
    },
  },
  beforeDestroy() {
    if (this.parent) {
      this.parent.removeLayer(this.mapObject);
    }
  }
};
</script>
