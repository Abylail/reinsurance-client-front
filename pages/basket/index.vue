<template>
  <mobile-header title="Корзина"/>
  <div class="basket">
    <base-loader v-if="isLoading" center-horizontal/>
    <div v-else-if="!cartList.length"></div>

    <div v-else class="container--thin">
      <announcement-action-card
          v-for="item in cartList" :key="item.id"
          :info="item"
      />
    </div>

    <div class="basket__order" v-if="totalPrice">
      <div class="container--thin basket__order-content">
        <div class="basket__order-title">Оформление заказа</div>
        <div class="basket__order-row" v-for="(item, index) in totalRows" :key="index">
          {{ item.title }} - {{ item.price.toLocaleString() }}
        </div>

        <div class="basket__total">
          <div class="basket__total-price">К оплате: {{ totalPrice.toLocaleString() }}</div>
          <base-button full-width @click="submit()">Оформить покупку</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useCartStore} from "../../store/announcement/basket";
import {computed, onMounted, ref} from "vue";
import BaseLoader from "../../components/base/BaseLoader";
import AnnouncementActionCard from "../../components/common/miniCards/announcementActionCard";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";

definePageMeta({
  middleware: "auth"
})

const isLoading = ref(true);
const cartStore = useCartStore();
const cartList = computed(() => cartStore.getList || []);
const fetchCart = async () => {
  isLoading.value = true;
  await cartStore.fetchCart();
  isLoading.value = false;
}

const totalRows = computed(() => {
  return cartList.value
      .filter(item => item.status === 'active')
      .map(item => ({title: item.title, price: +item.price}))
})

const totalPrice = computed(() => totalRows.value.reduce((accumulator, item) => accumulator + item.price, 0))

const confirmed = ref(false);
const address = ref(null);
const submit = () => {

}
onMounted(() => {
  fetchCart()
})
</script>

<style lang="scss" scoped>
.basket {
  padding-bottom: 50vh;

  &__order {
    display: flex;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid $color--gray;
    background-color: white;
  }

  &__order-content {
    padding: 1rem 1rem 5rem;
  }

  &__order-title {
    font-size: $fs--sub-title;
    margin-bottom: 1rem;
  }

  &__order-details {

  }

  &__total {
    display: flex;
    flex-direction: column;
    border-top: 1px solid $color--gray;
    margin-top: 1rem;
    padding-top: 1rem;
  }

  &__total-price {
    margin-bottom: 1rem;
    font-size: $fs--sub-title;
  }

}
</style>