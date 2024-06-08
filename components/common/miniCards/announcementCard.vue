<template>
  <div class="announcement-card" @click="goDetails()">
    <base-mini-photos
        class="announcement-card__photos"
        :list="props.info.photos"
        :showCount="props.info.photos && props.info.photos.length > 1"
        object-fit="cover"
        rounded
    />

    <div class="announcement-card__info">
      <div class="announcement-card__price">{{ props.info.price.toLocaleString() }} ₸</div>
      <div class="announcement-card__title">{{ props.info.title }}</div>
    </div>

    <button class="announcement-card__add" @click.prevent.stop="toggleFavorite()">
      <base-icon name="mdi-heart-outline" size="24" v-if="!isSelected"/>
      <base-icon name="mdi-heart" size="24" color="red" v-else/>
    </button>
  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";
import {useAuthStore} from "../../../store/parent/auth";
import {computed} from "vue";
import {useRouter} from "nuxt/app";

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
  if (authStore.isAuth) authStore.toggleFavorite(props.info.id);
  else router.replace({query: {login: ""}})
}

const goDetails = () => {
  router.push(`/announcements/announcement-${props.info.id}`)
}
</script>

<style lang="scss" scoped>
.announcement-card {
  position: relative;
  width: 100%;
  max-width: 250px;

  &__photos {
    aspect-ratio: 1/1;
    width: 100%;
    background-color: white;
    border-radius: .75rem;
    overflow: hidden;
  }

  &__info {
    margin-top: .5rem;
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
}
</style>