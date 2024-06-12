<template>
  <mobile-header :title="info.title" go-back="/announcements"/>
  <div class="ann-details">
    <base-mini-photos class="ann-details__photos" v-if="info.photos?.length" :list="info.photos" full-on-click/>
    <div class="ann-details__main-content container--white">
      <h1 class="ann-details__title">{{ info.title }}</h1>
      <p class="ann-details__description"><base-cut-text :text="info.description"/></p>
      <h2 class="ann-details__price">{{ info.price?.toLocaleString() }} ₸</h2>
      <div class="ann-details__actions">
        <base-button v-if="!isInCart" type="orange" full-width @click="toggleCart()">Добавить в корзину +</base-button>
        <base-button v-else type="outline" full-width @click="router.push('/basket')">В корзину</base-button>
        <button class="ann-details__actions-favorite" @click="toggleFavorite()">
          <base-icon name="mdi-heart-outline" size="30" color="red" v-if="!isFavorite"/>
          <base-icon name="mdi-heart" size="30" color="red" v-else/>
        </button>
      </div>
    </div>

    <div class="ann-details__main-content container--white">
      <div class="ann-details__info-block">
        <div class="ann-details__hint">Возраст</div>
        <p class="ann-details__description">{{ usageAge }}</p>
      </div>
      <div class="ann-details__info-block">
        <div class="ann-details__hint">От владеца</div>
        <p class="ann-details__description"><base-cut-text :text="info.use_experience"/></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import {useRoute, useRouter} from "nuxt/app";
import {useAnnouncementStore} from "../../../store/announcement";
import BaseMiniPhotos from "../../../components/base/BaseMiniPhotos";
import {computed} from "vue";
import BaseButton from "../../../components/base/BaseButton";
import BaseIcon from "../../../components/base/BaseIcon";
import {useAuthStore} from "../../../store/parent/auth";
import BaseCutText from "../../../components/base/BaseCutText";
const nuxtApp = useNuxtApp();

const route = useRoute();
const router = useRouter();
const announcementStore = useAnnouncementStore();
const info = computed(() => announcementStore.getSingle);
await announcementStore.fetchOne(route.params.id);

const authStore = useAuthStore();
const isFavorite = computed(() => authStore.getFavoriteIds?.includes(info.value.id))
const toggleFavorite = () => {
  if (authStore.isAuth) authStore.toggleFavorite(info.value.id);
  else router.replace({query: {login: ""}})
}

const isInCart = computed(() => authStore.getCartIds?.includes(info.value.id))
const toggleCart = () => {
  if (authStore.isAuth) authStore.toggleCart(info.value.id);
  else router.replace({query: {login: ""}})
}

// Получить возраст
const usageAge = computed(() => {
  if (!info.value.min_age && !info.value.max_age) return null;
  let minAge = "";
  if (!info.value.min_age) minAge = "";
  else if (info.value.min_age % 12 === 0) minAge = nuxtApp.$t("from_age_year", {age: info.value.min_age/12});
  else minAge = nuxtApp.$t("from_age_month", {age: info.value.min_age});

  const maxAge = info.value.max_age % 12 === 0
      ? nuxtApp.$t("until_age_year", {age: info.value.max_age/12})
      : nuxtApp.$t("until_age_month", {age: info.value.max_age})
  return `${minAge} ${maxAge}`
});
</script>

<style lang="scss" scoped>
.ann-details {

  &__main-content {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    margin-bottom: 1rem;
  }

  &__photos {
    aspect-ratio: 4/3;
  }

  &__title {
    font-size: $fs--big-title;
    font-weight: 500;
  }

  &__price {
    font-size: $fs--big-title;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: .5rem;
  }

  &__hint {
    font-size: $fs--mini;
    line-height: 1rem;
    color: $color--gray-dark;
  }

  &__info-block:not(:last-child) {
    margin-bottom: .5rem;
  }

}
</style>