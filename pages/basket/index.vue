<template>
  <mobile-header title="Корзина"/>
  <div class="basket">
    <base-loader v-if="isLoading" center-horizontal/>
    <div v-else-if="!cartList.length"></div>
    <div v-else class="basket__list container--thin">
      <announcement-action-card
          v-for="item in cartList" :key="item.id"
          :info="item"
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useCartStore} from "../../store/announcement/basket";
import {computed, onMounted, ref} from "vue";
import BaseLoader from "../../components/base/BaseLoader";
import AnnouncementActionCard from "../../components/common/miniCards/announcementActionCard";

definePageMeta({
  middleware: "auth"
})

const isLoading = ref(true);
const cartStore = useCartStore();
const cartList = computed(() => cartStore.getList);
const fetchCart = async () => {
  isLoading.value = true;
  await cartStore.fetchCart();
  isLoading.value = false;
}

onMounted(() => {
  fetchCart()
})
</script>

<style lang="scss" scoped>

</style>