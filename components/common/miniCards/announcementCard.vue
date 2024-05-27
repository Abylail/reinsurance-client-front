<template>
  <div class="announcement-card">
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

    <button class="announcement-card__add">
      <base-icon name="mdi-heart-outline" size="24"/>
    </button>
  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
})
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
    opacity: .5;
  }
}
</style>