<template>
  <div class="toy-card" :class="{'toy-card--row': props.row}" @click="goDetails()">
    <base-mini-photos
        class="toy-card__photos"
        :list="props.toy.photos"
        :showCount="props.toy.photos && props.toy.photos.length > 1"
        object-fit="contain"
    />

    <div class="toy-card__info">
      <h3 class="toy-card__title">{{ $getProp(props.toy, 'name') }}</h3>

      <div class="toy-card__age">
        {{ getAge(props.toy) }}
      </div>

      <div class="toy-card__price">
        <base-icon class="toy-card__icon" name="mdi-currency-usd" size="14" color="white"/>
        {{ props.toy.token }} токен
      </div>

      <div class="toy-card__basket-connection" v-if="basket">
        <base-button
            v-if="!isIncluded"
            class="toy-card__add"
            type="outline"
            size="mini"
            full-width
            @click.stop.prevent="addHandle()"
        >{{ $t('add_button') }}</base-button>
        <base-button
            v-else
            class="toy-card__add"
            type="outline-gray"
            size="mini"
            full-width
            @click.stop.prevent="removeHandle()"
        >{{ $t('remove_button') }}</base-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";
import BaseButton from "../../base/BaseButton";
import {useToysCartStore} from "../../../store/announcement/basket";
import {computed} from "vue";
import {useRouter} from "nuxt/app";

const nuxtApp = useNuxtApp();

const props = defineProps({
  toy: {
    type: Object,
    default: () => ({})
  },
  basket: {
    type: Boolean,
    default: false
  },
  row: {
    type: Boolean,
    default: false
  },
  route: {
    type: Boolean,
    default: false
  }
})

// Название игрушки
const toyName = computed(() => props.toy.name_ru)

const toysCartStore = useToysCartStore();

const isIncluded = computed(() => process.client && toysCartStore.getIdList.includes(props.toy.id));

const router = useRouter()
const goDetails = () => {
  if (!props.route) return;
  router.push(`/toys/toy-${props.toy.id}`)
}

// Добавить игрушку в корзину
const addHandle = () => {
  if (process.server) return;
  toysCartStore.addToy(props.toy);
}

// Добавить игрушку в корзину
const removeHandle = () => {
  if (process.server) return;
  toysCartStore.removeToy(props.toy);
}

// Получить возраст
const getAge = (toy) => {
  if (!toy.min_age && !toy.max_age) return null;
  let minAge = "";
  if (!toy.min_age) minAge = "";
  else if (toy.min_age % 12 === 0) minAge = nuxtApp.$t("from_age_year", {age: toy.min_age/12});
  else minAge = nuxtApp.$t("from_age_month", {age: toy.min_age});

  const maxAge = toy.max_age % 12 === 0
      ? nuxtApp.$t("until_age_year", {age: toy.max_age/12})
      : nuxtApp.$t("until_age_month", {age: toy.max_age})
  return `${minAge} ${maxAge}`
};
</script>

<style lang="scss" scoped>
.toy-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: 8px 2vw;
  //margin-right: 8px;
  margin-bottom: 8px;
  min-width: 150px;
  max-width: 180px;
  width: 100%;
  background-color: white;

  &__info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__photos {
    height: 140px;
    width: 100%;
    background-color: white;
    border-radius: 5px;
  }

  &__title {
    color: $color--blue-dark;
    font-size: $fs--mini;
    margin: 8px 0 4px;
  }

  &__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 1px;
    background-color: $color--blue-dark;
  }

  &__age {
    font-size: $fs--nano;
    margin-bottom: 4px;
    color: $color--gray-dark;
  }

  &__price {
    font-size: $fs--mini;
  }

  &__basket-connection {
    display: block;
    margin-top: auto;
  }

  &__add {
    margin-top: 16px;
  }

  &--row {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 16px;
    max-width: none;
    padding: $side-space-mobile;
    background-color: white;
    margin-top: 4px;
    width: auto;
    margin-right: 0;
  }

  &--row .toy-card__photos {
    height: 100px;
  }
}
</style>