<template>
  <mobile-header :title="titleCategory">
    <template #right>
       <button @click="router.push('/account/favorite')">
         <base-icon color="red" name="mdi-heart" size="30"/>
       </button>
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
import {useRoute, useRouter} from "nuxt/app";
import {computed} from "vue";
import {useCategoriesStore} from "../../store/categories";
import BaseIcon from "../../components/base/BaseIcon";

const route = useRoute();
const router = useRouter();

const categoryStore = useCategoriesStore();

const activeCategory = computed(() => route.params.category ? categoryStore.getList?.find(c => c.code === route.params.category) : null)
const titleCategory = computed(() => activeCategory.value?.name_ru || "Товар")
</script>

<style scoped>

</style>