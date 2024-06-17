<template>
  <div class="my-city" :class="{'my-city--error': !cityExist}">
    <div class="my-city__content">
      <div class="my-city__title">
        <base-icon name="mdi-map-marker"/>
        <span>Ваш город:</span>
      </div>
      <div class="my-city__city" @click="() => active = true">
        <span>{{ cityTitle }}</span>
        <base-icon name="mdi-chevron-down"/>
      </div>
    </div>

    <div class="my-city__error">Ваш город не поддеживается</div>
  </div>

  <base-backdrop v-model:active="active" title="Выберите город">
    <div class="my-city__list">
      <button class="my-city__list-item" v-for="city in cities" :key="city.code" @click="selectCity(city.code)">
        <span>{{ city.name }}</span>
        <span class="my-city__list-item-index" :class="{'my-city__list-item-index--active': city.code === authStore.getCity}"/>
      </button>
    </div>
  </base-backdrop>
</template>

<script setup>
import {useAuthStore} from "../../../store/parent/auth";
import {computed} from "vue";
import {cityName} from "../../../config/city";
import BaseIcon from "../../base/BaseIcon";
import BaseBackdrop from "../../base/BaseBackdrop";

const authStore = useAuthStore();
const cityTitle = computed(() => cityName[authStore.getCity] || authStore.getCity);
const cityExist = computed(() => !!cityName[authStore.getCity]);

const active = ref(false);

const cities = computed(() => Object.keys(cityName).map(code => ({code, name: cityName[code]})));
const selectCity = (cityCode) => {
  authStore.setCity(cityCode);
  active.value = false;
}
</script>

<style lang="scss" scoped>
.my-city {
  background: $color--green-light;
  padding: 1rem;
  width: calc(100% - 4rem - 2px);
  border-radius: 10px;
  color: $color--green;
  border: 1px solid currentColor;
  margin: 0 auto 1rem;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__city {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  &__error {
    display: none;
    margin-top: .5rem;
    text-align: center;
    color: $color--red;
  }

  &--error {
    background: white;
    border-color: $color--red;
    .my-city__error {display: block}
  }

  &__list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: 1px solid $color--green;
    width: 100%;
    font-size: $fs--default;
  }

  &__list-item-index {
    display: flex;
    align-items: center;
    justify-content: center;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 30px;
    border: 2px solid $color--green;

    &--active::after {
      display: block;
      content: "";
      height: 1rem;
      width: 1rem;
      background: $color--green;
      border-radius: 1rem;
    }
  }
}
</style>