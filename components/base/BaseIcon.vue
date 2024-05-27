<template>
  <span
    class="base-icon mdi"
    :class="[props.name]"
    :style="{
      fontSize: size,
      height: size,
      width: size,
      minWidth: size,
      color,
      backgroundColor,
    }"
    v-bind="$attrs"
  />
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.min.css";
import {computed} from "vue";
const props = defineProps({
  name: String, // Имя иконки
  color: {
    type: String,
    default: undefined
  },
  backgroundColor: {
    type: String,
    default: undefined
  },
  size: { // Размер иконки
    type: [Number, String],
    default: 24
  },
})

const size = computed(() => `${props.size}px`)
</script>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>