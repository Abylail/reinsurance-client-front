<template>
  <mobile-header title="Мои покупки" go-back="/account"/>
  <div class="purchases">
    <base-loader v-if="isLoading" center-horizontal/>
    <div v-else-if="!purchases.length" class="purchases__empty">Вы еще ничего не покупали<br/>Желаем вам классных покупок!</div>
    <div v-else class="purchases__list container--thin">
      <announcement-action-card
          v-for="item in purchases" :key="item.id"
          :info="item"
          hide-actions
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import {computed, onMounted, ref} from "vue";
import BaseLoader from "../../../components/base/BaseLoader";
import {usePurchasesStore} from "../../../store/announcement/purchases";
import AnnouncementActionCard from "../../../components/common/miniCards/announcementActionCard";

definePageMeta({
  middleware: "auth"
})

const isLoading = ref(true);
const purchasesStore = usePurchasesStore();
const purchases = computed(() => purchasesStore.getList);

const fetchPurchases = async () => {
  isLoading.value = true;
  await purchasesStore.fetchList();
  isLoading.value = false;
}

onMounted(() => {
  fetchPurchases();
})
</script>

<style lang="scss" scoped>
.purchases {

  &__empty {
    text-align: center;
    color: $color--gray-dark;
    margin-top: 2rem;
  }

}
</style>