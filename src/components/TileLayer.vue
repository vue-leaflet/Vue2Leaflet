<template>
</template>

<script>

export default {
    props: ['url','attribution', 'token'],
    mounted() {
      this.$tileLayer = L.tileLayer(this.url, {
        attribution: this.attribution,
        token: this.token
      });
    },
    methods: {
      deferredMountedTo(parent) {
        this.$tileLayer.addTo(parent);
        _.forEach(this.$children, (child) => {
          child.deferredMountedTo(that);
        });
      }
    }
};
</script>
