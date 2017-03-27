<template>
</template>

<script>

export default {
  props: ['geojson','options'],
  mounted() {
    this.$geoJSON = L.geoJSON(this.geojson, this.options);
    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.$geoJSON);
    }
  },
  beforeDestroy() {
    this.setVisible(false);
  },
  watch: {
    geojson: {
      handler(newVal) {
        this.$geoJSON.clearLayers()
        this.addGeoJSONData(newVal);
      },
      deep: true,
    },
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent;
      this.$geoJSON.addTo(parent);
      var that = this.mapObject;
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(that);
      }
    },
    addGeoJSONData(geojsonData) {
      this.$geoJSON.addData(geojsonData);
    },
    getGeoJSONData() {
      return this.$geoJSON.toGeoJSON();
    },
    getBounds() {
      return this.$geoJSON.getBounds();
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.$geoJSON.addTo(this.parent);
      } else {
        this.parent.removeLayer(this.$geoJSON);
      }
    },
  }
};
</script>
