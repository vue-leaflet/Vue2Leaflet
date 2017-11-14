<template>
  <div>
    My {{ data.type }} is <span :style="{ color: data.color}">{{ data.color }}</span>
  </div>
</template>

<script>

export default {
  name: 'PopupContent',
  props: ['data'],
}
</script>
