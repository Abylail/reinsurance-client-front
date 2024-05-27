<template>
  <!-- Кнопка вызова фильтра -->
  <button class="filter-button" @click="toggleHandle()">
    <base-icon name="mdi-tune"/>
  </button>

  <!-- Страница фильтра -->
  <div class="filter-page" v-if="isOpen">
    <mobile-header title="Фильтр и сортировка" :go-back="toggleHandle"/>
    <div class="filter-page__content">
      <base-select
        title="Город"
        prev-icon="mdi-city-variant-outline"
        :model-value="selfOptions.city"
        :options="[{name: 'Алматы', key: 'almaty'}, {name: 'Астана', key: 'astana'}]"
        @update:modelValue="setOption($event, 'city')"
      />
      <base-options
        title="Сортировать по"
        :model-value="selfOptions.sortBy"
        :options="[{name: 'совпадению', key: 'sovpadenie'}, {name: 'рейтигну', key: 'rating'}]"
        @update:modelValue="setOption($event, 'sortBy')"
      />
      <base-options
        title="Язык"
        :model-value="selfOptions.lang"
        :options="[{name: 'Русский', key: 'ru'}, {name: 'Казахский', key: 'kz'}]"
        multi
        @update:modelValue="setOption($event, 'lang')"
      />
      <base-options
        title="Возраст"
        :model-value="selfOptions.age"
        :options="[{name: 'с 9 до 16', key: '9-16'}, {name: 'с 5 до 9', key: '5-9'}, {name: 'до 5', key: '-5'}]"
        @update:modelValue="setOption($event, 'age')"
      />
    </div>

    <div class="filter-page__actions">
      <base-button class="filter-page__action" type="outline" full-width @click="clearHandle()">Сбросить</base-button>
      <base-button class="filter-page__action" full-width @click="applyHandle()">Применить</base-button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import BaseIcon from "../../base/BaseIcon";
import MobileHeader from "../layoutComponents/mobileHeader";
import BaseSelect from "../../base/BaseSelect";
import BaseOptions from "../../base/BaseOptions";
import BaseButton from "../../base/BaseButton";

const emit = defineEmits(["update:options"]);
const props = defineProps({
  options: Object
})

// Внутренние опции
const selfOptions = ref({});

// Открытие фильтр
const isOpen = ref(false);
const setOpen = value => {
  isOpen.value = value;
  if (value) window.document.body.parentElement.style.overflow = 'hidden';
  else window.document.body.parentElement.style.overflow = null;
}
const toggleHandle = () => {
  setOpen(!isOpen.value)
  if (isOpen.value) selfOptions.value = JSON.parse(JSON.stringify(props.options));
}

// Изменить опцию
const setOption = (value, optionName) => {
  selfOptions.value = {...selfOptions.value, [optionName]: value};
}

// Сбросить (кнопка)
const clearHandle = () => {
  emit("update:options", null);
  setOpen(false);
}

// Применить (кнопка)
const applyHandle = () => {
  emit("update:options", selfOptions.value);
  setOpen(false);
}
</script>

<style lang="scss" scoped>
.filter-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: white;

  &__content {
    padding: 0 $side-space-mobile;
  }

  &__actions {
    position: absolute;
    bottom: 32px;
    left: $side-space-mobile;
    right: $side-space-mobile;
  }

  &__action:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>