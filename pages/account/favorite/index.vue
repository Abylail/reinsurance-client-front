<template>
  <mobile-header title="Избранные" go-back="/account"/>
  <div class="favorite">
    <base-loader v-if="isLoading" center-horizontal/>
    <div v-else-if="!favoriteList.length"></div>
    <div v-else class="basket__list container--thin">
      <announcement-action-card
          v-for="item in favoriteList" :key="item.id"
          :info="item"
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import {computed, onMounted, ref} from "vue";
import {useFavoriteStore} from "../../../store/announcement/favorite";
import BaseLoader from "../../../components/base/BaseLoader";
import AnnouncementActionCard from "../../../components/common/miniCards/announcementActionCard";

definePageMeta({
  middleware: "auth"
})

const isLoading = ref(true);
const favoriteStore = useFavoriteStore();
const favoriteList = computed(() => favoriteStore.getList);
const fetchFavorite = async () => {
  isLoading.value = true;
  await favoriteStore.fetchFavorite();
  isLoading.value = false;
}

onMounted(() => {
  fetchFavorite();
})
</script>

<style scoped>

</style>