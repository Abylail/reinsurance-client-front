<template>
  <div class="base-switch">
    <button
        class="base-switch__option"
        :class="{'base-switch--selected': option.key === modelValue}"
        v-for="(option, index) in options" :key="index"
        @click="selectHandle(option.key)"
    >{{ option.name }}</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  options: Array, // {name, key}
  modelValue: String,
})

// Выбор опции
const selectHandle = key => emit("update:modelValue", key);
</script>

<style lang="scss" scoped>
.base-switch {
  display: flex;
  border: 1px solid $color--blue;
  border-radius: 5px;
  transition: $transition;
  margin: 8px 0;

  &__option {
    flex: 1;
    font-size: $fs--default;
    padding: 4px 0;
    color: $color--blue;

    &:not(:first-child) {
      border-left: 1px solid $color--blue;
    }
  }

  &--selected {
    color: white;
    background: $color--blue;
  }
}
</style>