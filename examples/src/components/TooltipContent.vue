<template>
  <div>
    My {{ data.type }} is
    <span :style="{ color: data.color }">{{ data.color }}</span>
  </div>
</template>

<script>
export default {
  name: "TooltipContent",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
