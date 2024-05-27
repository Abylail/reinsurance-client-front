<template>
  <div class="categories-select">
    <span
        class="chip--outlined categories-select__option"
        :class="{'chip--blue': isSelected(option)}"
        v-for="option in props.options" :key="option.code"
        @click="selectToggle(option)"
    >{{option.name_ru}}</span>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: Array,
  options: { // name, key
    type: Array,
    default: () => []
  },
})

const isSelected = option => props.modelValue?.indexOf(option.code) >= 0;

const selectToggle = option => {
  if (!isSelected(option)) emit("update:modelValue", [...(props.modelValue || []), option?.code]);
  else {
    let newValue = props.modelValue.slice();
    const index = props.modelValue.indexOf(option.code);
    newValue.splice(index, 1);
    emit("update:modelValue", newValue);
  }
}
</script>

<style lang="scss" scoped>
.categories-select {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin: .5rem 0;
  //justify-content: space-around;

  &__option {
    margin: 0;
    cursor: pointer;
  }
}
</style>