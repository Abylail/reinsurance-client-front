<template>
<div class="base-select" :class="{'base-select--disabled': props.disabled}">
  <!-- Обычный вид -->
  <div class="base-select__hit-box" v-if="props.viewType === 'default'" @click="hitBoxHandle()">
    <!-- Иконка -->
    <base-icon class="base-select__prev-icon" size="28" v-if="prevIcon" :name="prevIcon"/>

    <div class="base-select__title" :class="[{'base-select__title--with-icon': prevIcon}, {'base-select__title--top': titleTop}]">{{ title }}</div>

    <div class="base-select__value-label">{{ valueLabel }}</div>
  </div>

  <!-- Маленький вид -->
  <div class="base-select__mini" v-else-if="props.viewType === 'mini'" @click="hitBoxHandle()">

    <div class="base-select__mini-value-label">{{ valueLabel }}</div>

    <div class="base-select__title" v-if="title">{{ title }}</div>

    <!-- Иконка -->
    <base-icon class="base-select__mini-icon" size="12" name="mdi-triangle-down"/>
  </div>

  <!-- Линейный вид -->
  <div class="base-select__line container--white" v-else-if="props.viewType === 'line'" @click="hitBoxHandle()">

    <div class="base-select__line-title">{{ title }}</div>

    <div class="base-select__line-value">
      <div class="base-select__line-value-label">{{ valueLabel || emptyText }}</div>
      <base-icon class="base-select__line-icon" size="24" name="mdi-chevron-right"/>
    </div>
  </div>
</div>
  <!-- Список опций в бэкдропе -->
  <base-backdrop v-model:active="active" :title="modalTitle">

    <div class="base-select__options" v-if="sorting">
      <div v-for="pack in optionList">
        <div class="base-select__option-label">{{ pack.label }}</div>
        <div
            class="base-select__option"
            :class="{'base-select__option--selected': isSelected(option)}"
            v-for="option in pack.value" :key="option"
            @click="selectHandle(option)"
        >
          <base-icon class="base-select__option-icon" v-if="props.itemIcon" :name="option[itemIcon]"/>
          <span>{{ option[itemText] }}</span>
        </div>
      </div>
    </div>

    <div class="base-select__options" v-else>
      <div
          class="base-select__option"
          :class="{'base-select__option--selected': isSelected(option)}"
          v-for="option in optionList" :key="option"
          @click="selectHandle(option)"
      >
        <base-icon class="base-select__option-icon" v-if="props.itemIcon" :name="option[itemIcon]"/>
        <span>{{ option[itemText] }}</span>
      </div>
    </div>

  </base-backdrop>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseIcon from "./BaseIcon";
import BaseBackdrop from "./BaseBackdrop";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  modelValue: [String, Number, Array],
  options: { // name, key
    type: Array,
    default: () => []
  },
  prevIcon: {
    type: String,
    default: null
  },
  viewType: {
    type: String,
    default: "default",
    validator: vt => ["default", "mini", "line"].includes(vt)
  },
  emptyText: {
    type: String,
    default: null
  },
  itemText: {
    type: String,
    default: "name"
  },
  itemValue: {
    type: String,
    default: "key"
  },
  itemIcon: {
    type: String,
    default: null
  },
  modalTitle: {
    type: String,
    default: "Выберите"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  sorting: { // Сортировать по алфавиту
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    defaults: false
  }
})

const valueLabel = computed(() => {
  if (!props.multiple) return props.options?.find(o => o[props.itemValue] === props.modelValue)?.[props.itemText]
  return props.modelValue?.map(val => {
    const option = props.options.find(o => o[props.itemValue] === val);
    return option?.[props.itemText];
  }).join(", ")
})

// Активен ли инпун
const active = ref(false);

// Список опций
const optionList = computed(() => {
  if (!props.sorting) return props.options || [];
  let dict = {};
  props.options?.forEach(opt => {
    if (!dict[opt[props.itemText]?.[0]]) dict[opt[props.itemText]?.[0]] = [];
    dict[opt[props.itemText]?.[0]].push(opt);
  });
  const packs = Object.keys(dict).map(dictKey => ({label: dictKey, value: dict[dictKey]})) || [];
  return packs.sort((pack1, pack2) => pack1.label.localeCompare(pack2.label));
})

// Поднять тайтл
const titleTop = computed(() => {
  if (active.value) return true;
  if (!props.multiple) return props.modelValue;
  return !!props.modelValue?.length;
})

// Клик по коробке
const hitBoxHandle = () => {
  active.value = true;
}

const isSelected = option => {
  if (!props.modelValue) return false
  if (!props.multiple) return (option[props.itemValue] === props.modelValue);
  return props.modelValue?.indexOf(option[props.itemValue]) >= 0;
}

// Выбрать
const selectHandle = option => {
  if (!props.multiple) emit("update:modelValue", option?.[props.itemValue] || null);
  else {
    if (!isSelected(option)) emit("update:modelValue", [...(props.modelValue || []), option?.[props.itemValue]]);
    else {
      let newValue = props.modelValue.slice();
      const index = props.modelValue.indexOf(option[props.itemValue]);
      newValue.splice(index, 1);
      emit("update:modelValue", newValue);
    }
  }
  active.value = false;
}
</script>

<style lang="scss" scoped>
$input-height: 28px;
.base-select {

  &--disabled {
    pointer-events: none;
    opacity: .7;
  }

  &__hit-box {
    display: flex;
    position: relative;
    padding: 8px;
    border: 1px solid $color--gray;
    border-radius: 8px;
    margin: 8px 0;
    background-color: white;
  }

  &__mini {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__line {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $color--gray-light;
  }

  &__line-value {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $color--gray-dark;
  }

  &__line-value-labe {
    font-size: $fs--default;
  }

  &__title {
    position: absolute;
    font-size: $fs--default;
    font-weight: normal;
    line-height: $input-height;
    top: 8px;
    transition: $transition;

    &--top {
      font-size: $fs--nano;
      line-height: calc(#{$fs--nano} + 2px);
      top: 4px;
      font-weight: 300;
    }

    &--with-icon {
      left: 44px;
    }
  }

  &__prev-icon {
    height: $input-height;
    margin-right: 8px;
  }

  &__value-label {
    flex: 1;
    height: $input-height - 10px;
    padding-top: 12px;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__mini-value-label {
    color: $color--blue-dark;
  }

  &__mini-icon {
    margin-left: 4px;
    color: $color--blue;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: 20px $side-space-mobile;
    &:hover {background-color: $color--gray-light}

    &--selected {
      font-weight: bolder;
      background-color: $color--gray-light;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color--gray-light;
    }
  }

  &__option-label {
    padding: 4px $side-space-mobile;
    background-color: $color--gray-light;
    font-size: $fs--mini;
  }

  &__option-icon {
    padding-right: $side-space-mobile;
    color: $color--blue;
  }

}
</style>