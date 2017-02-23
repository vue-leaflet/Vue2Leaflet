<template>
</template>

<script>

export default {
  props: ['geojson','options'],
  mounted() {
    this.$geoJSON = L.geoJSON(this.geojson, this.options);
  },
  methods: {
    deferredMountedTo(parent) {
      this.$geoJSON.addTo(parent);
      _.forEach(this.$children, (child) => {
        child.deferredMountedTo(that);
      });
    },
    addGeoJSONData(geojsonData) {
      this.$geoJSON.addData(geojsonData);
    },
    getGeoJSONData() {
      return this.$geoJSON.toGeoJSON();
    },
    getBounds() {
      return this.$geoJSON.getBounds();
    }
  }
};
</script>
