<template>
  <div class="base-notice">
    <base-icon class="base-notice__icon" name="mdi-information-outline" size="30"/>
    <div class="base-notice__text" v-html="props.text"/>
  </div>
</template>

<script setup>
import BaseIcon from "./BaseIcon";

const props = defineProps({
  text: String
})
</script>

<style lang="scss" scoped>
.base-notice {
  display: flex;
  align-items: center;
  background-color: $color--blue-light;
  padding: 12px;
  border-radius: 12px;

  &__icon {
    color: $color--blue;
    margin-right: 12px;
  }

  &__text {
    text-align: left;
    color: $color--blue;
  }
}
</style>