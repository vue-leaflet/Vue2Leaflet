<template>
  <div>
    <p>
      I started out as a GeoJSON {{ type }}, but now I'm a Leaflet vector!
    </p>
    {{ text }}
  </div>
</template>

<script>

export default {
  name: 'GeoJson2Popup',
  props: {
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
};
</script>
