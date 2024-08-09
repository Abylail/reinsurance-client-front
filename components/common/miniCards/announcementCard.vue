<template>
  <div class="announcement-card" @click="goDetails()">
    <base-mini-photos
        class="announcement-card__photos"
        :list="props.info.photos"
        :showCount="props.info.photos && props.info.photos.length > 1"
        object-fit="cover"
        :rounded="false"
    />

    <div class="announcement-card__info">
      <div class="announcement-card__title">{{ props.info.title }}</div>
      <div class="announcement-card__price">{{ props.info.price.toLocaleString() }} ₸</div>
      <div class="announcement-card__tag" v-if="props.info.tag">{{ props.info.tag }}</div>
<!--      <base-rating-->
<!--          v-if="props.info.condition"-->
<!--          :model-value="props.info.condition"-->
<!--      />-->
    </div>

    <button class="announcement-card__add" @click.prevent.stop="toggleFavorite()">
      <base-icon name="mdi-heart-outline" size="24" v-if="!isSelected"/>
      <base-icon name="mdi-heart" size="24" color="red" v-else/>
    </button>

<!--    <a-->
<!--        class="announcement-card__self-price"-->
<!--        :href="`https://wa.me/77753862246?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%0A%0A%0A%D0%AF%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%B0%D0%B3%D0%B0%D1%8E%20%D0%B7%D0%B0%20%D1%82%D0%BE%D0%B2%D0%B0%D1%80%20%D0%BF%D0%BE%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B5%20https://kidrent.kz${announcementPath},%20%D1%81%D0%B2%D0%BE%D1%8E%20%D1%86%D0%B5%D0%BD%D1%83%20...(%D0%BD%D0%B0%D0%BF%D0%B8%D1%88%D0%B8%D1%82%D0%B5%20%D0%B2%D0%B0%D1%88%D1%83%20%D1%86%D0%B5%D0%BD%D1%83)`"-->
<!--        @click.stop-->
<!--    >Предложите цену</a>-->
  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";
import {useAuthStore} from "../../../store/parent/auth";
import {computed} from "vue";
import {useRouter} from "nuxt/app";
import BaseRating from "../../base/BaseRating";
const {$a} = useNuxtApp();

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
})

const router = useRouter();

const authStore = useAuthStore();
const isSelected = computed(() => authStore.getFavoriteIds?.includes(props.info.id))
const toggleFavorite = () => {
  $a.toggleFavorite();
  if (authStore.isAuth) authStore.toggleFavorite(props.info.id);
  else router.replace({query: {login: ""}})
}

const announcementPath = computed(() => `/announcements/announcement-${props.info.id}`);

const goDetails = () => {
  router.push(announcementPath.value)
}
</script>

<style lang="scss" scoped>
.announcement-card {
  position: relative;
  width: 100%;
  max-width: 250px;
  background-color: white;
  border-radius: .5rem;
  overflow: hidden;

  &__photos {
    aspect-ratio: 1/1;
    width: 100%;
    background-color: white;
    border-radius: 0;
    overflow: hidden;
  }

  &__info {
    padding: .75rem;
  }

  &__add {
    position: absolute;
    height: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: $color--gray-dark;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1rem;
    right: 1rem;
    opacity: .7;
  }

  &__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1;
    color: $color--gray-dark;
    font-size: $fs--nano;
  }

  &__price {
    margin-top: .15rem;
    font-weight: 500;
  }

  &__tag {
    margin-top: .15rem;
    display: inline-block;
    font-size: $fs--nano;
    border-radius: 1rem;
    border: 1px solid $color--red;
    font-weight: 500;
    color: $color--red;
    padding: .2rem .5rem;
    margin-left: auto;
    margin-right: auto;
  }

  &__self-price {
    color: $color--blue;
    font-size: $fs--mini;
    font-weight: 400;
  }
}
</style>