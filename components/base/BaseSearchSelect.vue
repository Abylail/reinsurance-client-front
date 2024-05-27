<template>
  <div class="search-select">
    <button class="search-select__select" @click="setShowModal(true)">
      <span class="search-select__select-left">
        <span class="search-select__title">{{ props.title }}</span>
        <span class="search-select__value">{{ activeSubjectName }}</span>
      </span>
      <base-icon name="mdi-chevron-right"/>
    </button>
  </div>

  <!-- Модалка со списком -->
  <div class="search-select__modal" v-if="showSelectModal">
    <mobile-header :title="props.modalTitle || props.title">
      <template #right>
        <button @click="setShowModal(false)">
          <base-icon name="mdi-close"/>
        </button>
      </template>
    </mobile-header>

    <!-- Список предметов -->
    <div class="search-select__modal-content">
    <div class="search-select__modal-list">
      <button
          class="search-select__modal-item"
          :class="{'search-select__modal-item--selected': !props.modelValue}"
          @click="selectHandle(null)"
      >Все предметы</button>
      <div class="search-select__modal-group" v-for="(list, letter) in groupedList" :key="letter">
        <div class="search-select__modal-group-letter container">{{ letter }}</div>
        <button
            class="search-select__modal-item"
            :class="{'search-select__modal-item--selected': props.modelValue === item[props.valueField]}"
            v-for="item in list" :key="item[props.valueField]"
            @click="selectHandle(item)"
        >
          <base-icon v-if="props.iconField" :name="item[props.iconField]" color="blue"></base-icon>
          <span>{{ item[props.nameField] }}</span>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import BaseIcon from "./BaseIcon";
import {useRoute, useRouter} from "nuxt/app";
import {useSubjectsStore} from "../../store/subjects";
import MobileHeader from "../common/layoutComponents/mobileHeader";
import {turnOffPageScroll, turnOnPageScroll} from "../../utlis/pageScroll";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  title: String,
  modalTitle: String,
  items: {
    type: Array,
    default: () => []
  },
  emptyTitle: {
    type: String,
    default: "Все"
  },
  nameField: {
    type: String,
    default: "name"
  },
  valueField: {
    type: String,
    default: "code"
  },
  iconField: {
    type: String,
    default: null
  }
})

const showSelectModal = ref(false);
const setShowModal = (val = false) => {
  showSelectModal.value = val;
  if (val) turnOffPageScroll()
  else turnOnPageScroll()
}

const subjectStore = useSubjectsStore();
subjectStore.fetchList();

const list = computed(() => [...props.items]?.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1) || []);
const groupedList = computed(() => {
  let groups = {};
  list.value.forEach(item => {
    if (item?.[props.nameField]) {
      if (!groups[item[props.nameField][0]]) groups[item[props.nameField][0]] = [item]
      else groups[item[props.nameField][0]].push(item)
    }
  })
  return groups;
})

const route = useRoute();
const activeSubjectCode = computed(() => props.modelValue || null);
const activeSubjectName = computed(() => list.value?.find(subject => subject[props.valueField] === activeSubjectCode.value)?.name || props.emptyTitle);

const router = useRouter();
const selectHandle = subject => {
  emit("update:modelValue", subject?.[props.valueField]);
  setTimeout(() => showSelectModal.value = false, 0);
}
</script>

<style lang="scss" scoped>
.search-select {

  &__select {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px $side-space-mobile;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
    font-size: $fs--default;
    font-weight: bold;
    background-color: white;
  }

  &__title {
    display: block;
    color: $color--gray-dark;
    font-size: $fs--mini;
    font-weight: normal;
  }

  &__value {
    display: table-cell;
    vertical-align: bottom;
    font-weight: normal;
    height: 20px;
  }

  &__modal {
    display: grid;
    grid-template-rows: auto 1fr;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 10;
    color: $color--black;
  }

  &__modal-content {
    overflow: auto;
  }

  &__modal-group {
    background: $color--gray-light;
    &:last-child {
      padding-bottom: 32px;
    }
  }

  &__modal-group-letter {
    padding: 8px 0 4px;
    color: $color--gray-dark;
    font-size: $fs--mini;
  }

  &__modal-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    text-align: left;
    border-top: 1px solid $color--gray-light;
    padding: 12px $side-space-mobile;
    font-size: $fs--default;
    color: $color--black;
    background: white;

    &--selected {
      font-weight: bolder;
    }
  }

}
</style>