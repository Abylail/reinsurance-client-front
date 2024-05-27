<template>
  <div :class="['base-input', `base-input--${type}`]">

    <div class="base-input__hit-box" @click.stop="hitBoxHandle()">

      <div class="base-input__title" :class="[{'base-input__title--with-icon': prevIcon}, {'base-input__title--top': titleTop}]">{{ title }}</div>

      <!-- Иконка -->
      <base-icon class="base-input__prev-icon" v-if="prevIcon" :name="prevIcon"/>

      <!-- Инпут с маской -->
      <textarea
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
      <textarea
          v-else
          class="base-input__input"
          :ref="el => inputElement = el"
          :value="valueLabel"
          :inputmode="inputmode"
          :autofocus="autofocus"
          @focus="onFocus()"
          @blur="onBlur()"
          @input="inputHandle($event.target?.value)"
      />

    </div>

  </div>
</template>

<script setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
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
  password: {
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
    validator: value => ["default", "bordered"].includes(value),
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

watch(() => props.modelValue, () => {
  nextTick(() => heightControl())
}, {immediate: true})

// Контроль высоты
const heightControl = () => {
  if (process.server) return;
  inputElement.value.style.height = 'auto'; // Сброс текущей высоты
  const height = inputElement.value.scrollHeight;
  inputElement.value.style.height = height + "px"; // Новая высота равна высоте содержимого
}

// Инпус с маской
const dataMaska = computed(() => {
  if (props.phone) return "+7 (###) ###-##-##"
  return null;
})
const isMasked = computed(() => !!dataMaska.value);

// Тип ввода
const inputType = computed(() => {
  if (props.password) return "password";
  return "text";
})
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
    border: 1px solid $color--gray-light;
    background-color: white;
  }

  &--bordered &__hit-box {
    border: 1px solid $color--black;
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
    min-height: 51px;
    padding-top: 12px;
    font-size: 16px;
    resize: none;
  }

}
</style>