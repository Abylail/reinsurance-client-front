<template>
  <div class="search-filter">
    <base-select
        :model-value="type"
        :options="types"
        view-type="mini"
        @update:modelValue="selectType($event)"
    />

    <button class="search-filter__button" @click="showFilterHandle(true)">
      <span>Фильтр</span>
      <base-icon class="search-filter__button-icon" name="mdi-tune" size="20"/>
    </button>
  </div>

  <div class="search-filter__modal" v-if="showFilter">
    <mobile-header title="Поиск" :go-back="() => showFilterHandle(false)">
      <template #right>
        <button
            class="search-filter__modal-clear"
            v-if="!isFilterEmpty"
            @click="clearFilter()"
        >Сбросить</button>
      </template>
    </mobile-header>
    <base-select
        :model-value="filterValue.category"
        :options="categoryStore.getList"
        title="Категория"
        item-value="code"
        modal-title="Выбор категории"
        view-type="line"
        empty-text="Все категории"
        sorting
        @update:modelValue="setCategory($event)"
    />
    <base-select
        v-model="filterValue.subject"
        :options="subjects"
        :title="subjectTitle"
        item-value="code"
        modal-title="Выбор предмета"
        view-type="line"
        empty-text="Все предметы"
        sorting
    />
    <base-select
        v-model="filterValue.age"
        title="Возраст"
        item-value="code"
        modal-title="Выберите возраст"
        view-type="line"
        empty-text="Любой возраст"
        :options="ages"
    />

    <base-button
        class="search-filter__action"
        size="big"
        type="default-light"
        full-width
        @click="searchHandle()"
    >Поиск</base-button>
  </div>
</template>

<script setup>
import BaseSelect from "../../base/BaseSelect";
import {useRouter} from "nuxt/app";
import BaseIcon from "../../base/BaseIcon";
import MobileHeader from "../layoutComponents/mobileHeader";
import {useCategoriesStore} from "../../../store/categories";
import {useSubjectsStore} from "../../../store/subjects";
import {computed, onMounted} from "vue";
import BaseButton from "../../base/BaseButton";

const props = defineProps({
  type: {
    type: String,
    require: true
  }
})

const categoryStore = useCategoriesStore();
const subjectStore = useSubjectsStore();
const router = useRouter();

const emptyFilter = {
  category: null,
  subject: null,
  age: null,
};
const filterValue = ref(JSON.parse(JSON.stringify(emptyFilter)));
const isFilterEmpty = computed(() => {
  return !Object.keys(emptyFilter).some(key => filterValue.value[key]);
})

const selectedCategory = computed(() => categoryStore.getList?.find(c => c.code === filterValue.value.category))

const ages = [
  {name: "1-4", code: "1-4"},
  {name: "4-6", code: "4-6"},
  {name: "6-10", code: "6-10"},
  {name: "10-14", code: "10-14"},
  {name: "14+", code: "14"},
]

const subjectTitle = computed(() => {
  if (!filterValue.value.category) return "Предметы"
  return `Предметы (${selectedCategory.value.name})`
})
const subjects = computed(() => {
  if (!filterValue.value.category) return subjectStore.getList
  return selectedCategory.value?.subjects || [];
})

const types = [
  {name: "Детские центры", key: "centers"},
  {name: "Уроки", key: "lessons"},
]
const selectType = type => {
  if (type === props.type) return;
  router.replace({
    path: `/catalog/${router.currentRoute.value.params.city}/${type}/${router.currentRoute.value.params.subject || ""}`,
    query: router.currentRoute.value.query
  })
}

const showFilter = ref(false);
const showFilterHandle = (show = true) => {
  showFilter.value = show;
  if (show) {
    filterValue.value = {
      subject: router.currentRoute.value.params.subject,
      ...router.currentRoute.value.query,
    }
  }
}

const setCategory = categoryCode => {
  filterValue.value = {...filterValue.value, category: categoryCode, subject: null};
}

// Очистить
const clearFilter = () => {
  filterValue.value = JSON.parse(JSON.stringify(emptyFilter));
}

// Поиск
const searchHandle = () => {
  router.replace({
    path: `/catalog/almaty/${props.type}/${filterValue.value.subject || ""}`,
    query: {...router.currentRoute.value.query, ...filterValue.value}
  });
  showFilter.value = false;
}

// Запросить словари (списки)
const fetchDicts = () => {
  subjectStore.fetchList();
  categoryStore.fetchList();
}


onMounted(() => {
  fetchDicts();
})
</script>

<style lang="scss" scoped>
.search-filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  box-sizing: content-box !important;
  width: calc(100% - 2*16px);
  padding: 12px 16px;
  border-bottom: 3px solid $color--gray-light;
  position: sticky;
  top: 0;
  z-index: 10;

  &__button {
    display: flex;
    align-items: center;
    font-size: $fs--default;
    color: $color--blue-dark;
  }

  &__button-icon {
    color: $color--blue;
    margin-left: 4px;
  }

  &__modal {
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  &__action {
    position: fixed;
    left: $side-space-mobile;
    right: $side-space-mobile;
    bottom: $side-space-mobile;
    width: calc(100% - 2*#{$side-space-mobile});
    margin-left: auto !important;
    margin-right: auto !important;
  }

  &__modal-clear {
    color: $color--blue;
    font-size: $fs--default;
  }
}
</style>