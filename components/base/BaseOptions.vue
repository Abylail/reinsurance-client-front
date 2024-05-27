<template>
  <div class="base-options">

    <div class="base-options__title">{{ title }}</div>

    <div class="base-options__list">
      <div
          class="base-options__option"
          v-for="option in options" :key="option"
          @click="selectHandle(option)"
      >
        <span class="base-options__check" :class="[{'base-options__check--multi': props.multi},{'base-options__check--single': !props.multi}]">
          <span class="base-options__check__dot" v-show="isSelected(option)"/>
        </span>
        {{ option.name }}
      </div>
    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  modelValue: [Array, String],
  options: Array, // name, key
  multi: {
    type: Boolean,
    default: false
  }
})

// Выбор опции
const selectHandle = option => {
   if (props.multi) selectMulti(option);
   else selectSingle(option);
}

const selectSingle = option => {
  emit("update:modelValue", option.key);
}

const selectMulti = option => {
  let newValue = Array.isArray(props.modelValue) ? props.modelValue.slice() : [];
  const optionIndex = newValue.findIndex(o => o === option.key);
  if (optionIndex < 0) newValue.push(option.key)
  else newValue.splice(optionIndex, 1)
  emit("update:modelValue", newValue);
}

const isSelected = option => props.multi ? props.modelValue?.includes(option.key) : props.modelValue === option.key;
</script>

<style lang="scss" scoped>
.base-options {
  margin: 16px 0;

  &__title {
    font-size: $fs--default;
  }

  &__option {
    display: flex;
    align-items: center;
    margin: 8px 0;
    font-size: $fs--mini;
  }

  &__check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    border: 2px solid $color--black;
    margin-right: 8px;

    &--multi {
      border-radius: 4px;
    }

    &--single {
      border-radius: 18px;
    }

    &__dot {
      display: block;
      height: 14px;
      width: 14px;
      background-color: $color--black;
      border-radius: inherit;
    }
  }

}
</style>