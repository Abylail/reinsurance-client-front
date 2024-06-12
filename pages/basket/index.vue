<template>
  <mobile-header title="Корзина"/>
  <div class="basket">
    <base-loader v-if="isLoading" center-horizontal/>
    <div v-else-if="!cartList.length" class="basket__empty">Корзина пуста<br/>Это как-то неправильно :)</div>

    <div v-else class="container--thin">
      <div class="basket__item" v-for="item in cartList" :key="item.id">
        <announcement-action-card :info="item"/>
        <base-toggle
            class="container"
            :title="`Дезинфицировать (+${priceDisinfected}тг)`"
            hint="Обработка горячим паром и хлогикседином"
            v-model="needDisinfected[item.id]"
        />
      </div>
    </div>

    <div class="basket__order" v-if="totalPrice">
      <div class="container--thin basket__order-content">
        <div class="basket__order-title">Оформление заказа</div>
        <div class="basket__order-row" v-for="(item, index) in totalRows" :key="index">
          <span>{{ item.title }}</span>
          <span>{{ item.price.toLocaleString() }}</span>
        </div>

        <div class="basket__order-info">
          Доставка по субботам, с вами свяжется менеджер
        </div>

        <div class="basket__total">
          <div class="basket__total-price">К оплате: {{ totalPrice.toLocaleString() }}</div>
          <base-button :loading="isSubmitLoading" full-width @click="submit()">Оформить покупку</base-button>
        </div>
      </div>
    </div>
  </div>

  <thanks-buy-modal :show="isSuccessSubmitted"/>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useCartStore} from "../../store/announcement/basket";
import {computed, onMounted, ref} from "vue";
import BaseLoader from "../../components/base/BaseLoader";
import AnnouncementActionCard from "../../components/common/miniCards/announcementActionCard";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";
import {useAuthStore} from "../../store/parent/auth";
import BaseSwitch from "../../components/base/BaseSwitch";
import BaseToggle from "../../components/base/BaseToggle";
import ThanksBuyModal from "../../components/common/basket/thanksBuyModal";

definePageMeta({
  middleware: "auth"
})

// Нужно ли дезинфицировать [id]: true
const needDisinfected = ref({});
const priceDisinfected = 2000;

const isLoading = ref(true);
const isSubmitLoading = ref(false);
const isSuccessSubmitted = ref(false);

const cartStore = useCartStore();
const cartList = computed(() => cartStore.getList || []);
const fetchCart = async () => {
  isLoading.value = true;
  await cartStore.fetchCart();
  isLoading.value = false;
}

const authStore = useAuthStore();

const totalRows = computed(() => {
  let rows = [];

  cartList.value
      .filter(item => authStore.getCartIds?.includes(item.id) && item.status === 'active')
      .forEach(item => {
        rows.push({title: item.title, price: +item.price});
        if (needDisinfected.value[item.id]) rows.push({title: `Дезинфекиця \"${item.title}\"`, price: priceDisinfected});
      })

  return rows;
})

const totalPrice = computed(() => totalRows.value.reduce((accumulator, item) => accumulator + item.price, 0))

const confirmed = ref(false);
const address = ref(null);
const submit = async () => {
  isSubmitLoading.value = true;
  const ids = cartList.value.filter(item => authStore.getCartIds?.includes(item.id) && item.status === 'active').map(({id}) => id)
  const isSuccess = await cartStore.buy({
    ids,
    needDisinfected: needDisinfected.value
  })

  if (isSuccess) isSuccessSubmitted.value = true;
  else alert("Извините, произошла ошибка")
}
onMounted(() => {
  fetchCart()
})
</script>

<style lang="scss" scoped>
.basket {

  &__item {
    margin-bottom: 1rem;
  }

  &__empty {
    text-align: center;
    color: $color--gray-dark;
    margin-top: 2rem;
  }

  &__order {
    display: flex;
    //position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid $color--gray;
    background-color: white;
  }

  &__order-info {
    margin-top: 1rem;
  }

  &__order-content {
    padding: 1rem;
  }

  &__order-title {
    font-size: $fs--sub-title;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  &__order-details {

  }

  &__order-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: $color--gray-dark;
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