<template>
  <div class="cart-window" :class="{'cart-window--active': !!toysCartStore.getCount}">
    <base-button class="cart-window__button" type="yellow" full-width @click="goCart()">
      <div class="cart-window__left">
        <base-icon class="cart-window__icon" name="mdi-currency-usd" size="24" color="white"/>
        <div class="cart-window__tokens">
          <span class="cart-window__count">{{ toysCartStore.getCount }}</span>/<span>100</span>
          <div class="cart-window__price">{{ monthlyPrice }} тг/{{ $t('month_short') }}</div>
        </div>
      </div>
      <div class="cart-window__right">
        {{ $t('add_to_cart') }}
      </div>
    </base-button>
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import BaseIcon from "../../base/BaseIcon";
import {useToysCartStore} from "../../../store/announcement/basket";
import {useRouter} from "nuxt/app";
import {computed} from "vue";
import {rates} from "../../../config/toysRates";

const toysCartStore = useToysCartStore();

// Цена за доп докены
const extraPrice = computed(() => toysCartStore.getCount > 100 ? (toysCartStore.getCount-100)*120 : 0);

// Цена в месяц
const monthlyPrice = computed(() => (rates.value[0].price_monthly + extraPrice.value))

const router = useRouter()
const goCart = () => {
  router.push("/basket");
}
</script>

<style lang="scss" scoped>
.cart-window {
  position: fixed;
  bottom: -65px;
  left: $side-space-mobile;
  right: $side-space-mobile;
  z-index: 1;
  transition: .3s;

  &--active {
    bottom: 70px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $fs--default !important;
    backdrop-filter: blur(3px);
    background: rgba(255, 218, 47, 0.9);
  }

  &__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 1px;
    background-color: $color--blue-dark;
    margin-right: 8px;
  }

  &__count {
    font-weight: bolder;
    color: $color--blue-dark;
  }

  &__left {
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: row;
  }

  &__tokens {
    text-align: left;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__price {
    font-size: $fs--nano;
  }
}
</style>