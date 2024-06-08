<template>
  <div class="announcement-action-card" :class="{'announcement-action-card--inactive': isInactive}">
    <div class="announcement-action-card__content container--white">
      <base-mini-photos
          class="announcement-action-card__photos"
          :list="props.info.photos"
          :showCount="props.info.photos && props.info.photos.length > 1"
          object-fit="cover"
          rounded
      />

      <div class="announcement-action-card__info">
        <div class="announcement-action-card__title">
          <div>{{ props.info.title }}</div>
          <button class="announcement-card__add" @click.prevent.stop="toggleFavorite()">
            <base-icon name="mdi-heart-outline" size="24" v-if="!isFavorite"/>
            <base-icon name="mdi-heart" size="24" color="red" v-else/>
          </button>
        </div>
        <div class="announcement-action-card__price">{{ props.info.price.toLocaleString() }} ₸</div>
        <div class="announcement-action-card__status" v-if="isInactive">Уже купили :(</div>

        <base-button class="announcement-action-card__action" v-if="isInCart" type="outline-gray" size="mini" @click="toggleCart()">Убрать из корзины</base-button>
        <base-button class="announcement-action-card__action" v-else type="orange" size="mini" @click="toggleCart()">Добавить в корзину</base-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";
import {useAuthStore} from "../../../store/parent/auth";
import BaseButton from "../../base/BaseButton";

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
})

const authStore = useAuthStore();

const isInactive = computed(() => props.info.status !== 'active');

const isFavorite = computed(() => authStore.getFavoriteIds?.includes(props.info.id))
const toggleFavorite = () => {
  authStore.toggleFavorite(props.info.id);
}

const isInCart = computed(() => authStore.getCartIds?.includes(props.info.id))
const toggleCart = () => {
  authStore.toggleCart(props.info.id);
}
</script>

<style lang="scss" scoped>
.announcement-action-card {
  display: flex;

  &--inactive {
    opacity: .7;
  }

  &__content {
    flex: 1;
    display: flex;
    gap: 1rem;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__photos {
    aspect-ratio: 1;
    width: 30%;
  }

  &__title {
    display: grid;
    grid-template-columns: 1fr 26px;
    font-size: $fs--title;
    margin-bottom: .25rem;
  }

  &__price {
    margin-bottom: .5rem;
  }

  &__status {
    color: $color--red;
  }

  &__action {
    margin-top: auto;
  }
}
</style>