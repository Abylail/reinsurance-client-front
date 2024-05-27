<template>
  <div :class="['base-input', `base-input--${type}`]">

    <div class="base-input__hit-box" @click.stop="hitBoxHandle()">

      <div class="base-input__title" :class="[{'base-input__title--with-icon': prevIcon}, {'base-input__title--top': titleTop}]">{{ title }}</div>

      <!-- Иконка -->
      <base-icon class="base-input__prev-icon" v-if="prevIcon" :name="prevIcon"/>

      <!-- Инпут с маской -->
      <input
          v-if="isMasked"
          class="base-input__input"
          :ref="el => inputElement = el"
          :value="valueLabel"
          v-maska :data-maska="dataMaska"
          :placeholder="placeholder"
          :inputmode="inputmode"
          :autofocus="autofocus"
          @focus="onFocus()"
          @blur="onBlur()"
          @input="inputHandle($event.target?.value)"
      />

      <!-- Просто инпут -->
      <input
          v-else
          class="base-input__input"
          :ref="el => inputElement = el"
          :value="valueLabel"
          :inputmode="inputmode"
          :autofocus="autofocus"
          :type="inputType"
          @focus="onFocus()"
          @blur="onBlur()"
          @input="inputHandle($event.target?.value)"
      />

    </div>

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import BaseIcon from "./BaseIcon";
import { vMaska } from "maska";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  modelValue: [String, Number],
  prevIcon: {
    type: String,
    default: null
  },
  phone: {
    type: Boolean,
    default: false
  },
  number: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "default",
    validator: value => ["default", "naked-gray"].includes(value),
  },
  placeholder: {
    type: String,
    default: ""
  }
})

// Видимое значение
const valueLabel = computed(() => props.modelValue);
const inputmode = computed(() => {
  if (props.phone) return "tel";
  if (props.number) return "numeric";
  return "text"
})

// Поднять тайтл
const titleTop = computed(() => active.value || props.modelValue || props.placeholder)

// Активен ли инпун
const active = ref(false);

// Елемент инпута
const inputElement = ref(null);
// Клик по коробке
const hitBoxHandle = () => {
  inputElement.value?.focus()
}

// На фокус
const onFocus = () => {
  active.value = true;
}

// На выход из инпута
const onBlur = () => {
  active.value = false;
}

// Ввод данных
const inputHandle = value => {
  emit("update:modelValue", value);
}

const inputType = computed(() => {
  if (props.number) return "number";
  return "text";
})

// Инпус с маской
const dataMaska = computed(() => {
  if (props.phone) return "+7 (###) ###-##-##"
  return null;
})
const isMasked = computed(() => !!dataMaska.value);
</script>

<style lang="scss" scoped>
$input-height: 32px;
.base-input {
  margin: 8px 0;

  &__hit-box {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 10px;
    padding: 8px;
  }

  &--default &__hit-box {
    border: 1px solid $color--gray;
    background-color: white;
  }

  &--naked-gray &__hit-box {
    border: 1px solid $color--gray-light;
    background-color: $color--gray-light;
  }

  &__title {
    position: absolute;
    font-size: $fs--default;
    line-height: $input-height;
    top: 8px;
    transition: $transition;

    &--top {
      font-size: $fs--nano;
      line-height: calc(#{$fs--nano} + 2px);
      top: 4px;
    }

    &--with-icon {
      left: 40px;
    }
  }

  &__prev-icon {
    height: $input-height;
    margin-right: 8px;
  }

  &__input {
    flex: 1;
    height: $input-height - 14px;
    padding-top: 12px;
    font-size: 16px;
  }

}
</style>