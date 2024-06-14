<template>
  <div class="base-rating">

    <div class="base-rating__list">
      <base-icon
          v-for="index in props.count" :key="index"
          class="base-rating__star"
          :class="{'base-rating__star--active': isActive(index)}"
          name="mdi-star"
          :size="24"
      />
    </div>

  </div>
</template>

<script setup>
import BaseIcon from "./BaseIcon";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 5
  }
})

const isActive = (index) => {
  return props.modelValue >= index;
}
</script>

<style lang="scss" scoped>
.base-rating {
  margin: .25rem 0;

  &__list {
    display: flex;
  }

  &__star {
    color: $color--gray;
    &--active {
      color: $color--yellow;
    }
  }

}
</style>