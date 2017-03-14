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
        var that = this.mapObject;
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].deferredMountedTo(that);
        }
      }
    }
};
</script>
