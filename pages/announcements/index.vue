<template>
  <mobile-header :title="titleCategory">
    <template #right>
      <base-button
          class="announcement-search__go-basket"
          size="mini"
          type="orange"
      >В корзину</base-button>
    </template>
  </mobile-header>

  <div class="announcement-search container">
    <categories :active-code="route.params.category" show-selected/>
    <nuxt-page/>
  </div>
</template>

<script setup>
import Categories from "../../components/common/search/categories";
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import BaseButton from "../../components/base/BaseButton";
import {useRoute} from "nuxt/app";
import {computed} from "vue";
import {useCategoriesStore} from "../../store/categories";

const route = useRoute();

const categoryStore = useCategoriesStore();

const activeCategory = computed(() => route.params.category ? categoryStore.getList?.find(c => c.code === route.params.category) : null)
const titleCategory = computed(() => activeCategory.value?.name_ru || "Товар")
</script>

<style scoped>

</style>