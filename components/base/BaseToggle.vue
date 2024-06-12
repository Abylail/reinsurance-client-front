<template>
  <div class="base-toggle">

    <label class="switch">
      <input type="checkbox" @click="toggleCheckbox">
      <div class="slider round"/>
    </label>

    <div v-if="props.title" class="base-toggle__content">
      <div class="base-toggle__title">{{ props.title }}</div>
      <div class="base-toggle__hint">{{ props.hint }}</div>
    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  hint: String,
  modelValue: Boolean,
})

const toggleCheckbox = () => {
  emit("update:modelValue", !props.modelValue)
}
</script>

<style lang="scss" scoped>
.base-toggle {
  display: flex;
  align-items: center;
  padding: .5rem 0;

  &__hint {
    color: $color--gray-dark;
    line-height: 1;
    font-size: $fs--mini;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 1rem;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $color--green;
}

input:focus + .slider {
  box-shadow: 0 0 1px $color--green;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>