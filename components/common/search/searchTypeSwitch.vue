<template>
  <button class="search-type-switch" @click="clickHandle()">
    <span class="search-type-switch__content" v-if="props.isMap">
      <base-icon name="mdi-view-headline"/>
      <span>Списком</span>
    </span>
    <span class="search-type-switch__content" v-else>
      <base-icon name="mdi-map-marker-outline"/>
      <span>На карте</span>
    </span>
  </button>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import {mapViewLessons} from "../../../utlis/analitics";

const emits = defineEmits(["change"])
const props = defineProps({
  isMap: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
})

const clickHandle = () => {
  if (props.isMap) mapViewLessons()
  emits("change")
}
</script>

<style lang="scss" scoped>
.search-type-switch {
  padding: 8px 16px;
  position: fixed;
  bottom: 80px;
  right: $side-space-mobile;
  background: #ffb340;
  border-radius: 30px;
  font-size: $fs--default;
  box-shadow: 0px 0px 8px -1px rgba(34, 60, 80, 0.4);
  z-index: 1;

  &__content {
    display: flex;
    align-items: center;
    color: $color--black;
  }
}
</style>