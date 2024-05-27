<template>
  <div class="base-mini-photos">
    <div class="base-mini-photos__slides" :class="[{'base-mini-photos__slides--rounded': props.rounded}]">
      <img
          class="base-mini-photos__slide"
          v-for="(photo, index) in props.list"
          :src="getImageUrl(photo)"
          :style="{objectFit: props.objectFit}"
          alt=""
          @click="clickSlide(index)"
      />
    </div>

    <div class="base-mini-photos__count" v-if="showCount">{{ list.length }}</div>


      <carousel :items-to-show="1" class="base-mini-photos__modal" v-if="showBigSlider" v-model="currentSlide" @click.stop.prevent>
        <slide class="base-mini-photos__modal-slide" v-for="(photo, index) in props.list" :key="index">
          <img
              class="base-mini-photos__modal-image"
              :src="getImageUrl(photo)"
              alt=""
          />
        </slide>
        <template #addons>
          <header class="base-mini-photos__modal-header">
            <button class="base-mini-photos__go-back" @click.stop.prevent="closeBigSlider()">
              <base-icon name="mdi-chevron-left" size="36" color="white"/>
            </button>
            <div>{{ currentSlide + 1 }} из {{ list.length }}</div>
          </header>
        </template>
      </carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {useRuntimeConfig} from "nuxt/app";
import {computed} from "vue";
import BaseIcon from "./BaseIcon";

const config = useRuntimeConfig();
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  showCount: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: Boolean,
    default: true
  },
  objectFit: {
    type: String,
    default: "cover",
    validator: of => ["cover", "contain"]
  },
  fullOnClick: {
    type: Boolean,
    default: false
  }
})

const getImageUrl = url => config.public.CDN_URL + url;

const currentSlide = ref(null);
const showBigSlider = computed(() => typeof currentSlide.value === "number")

const closeBigSlider = () => currentSlide.value = null;

const clickSlide = (index) => {
  if (!props.fullOnClick) return;
  currentSlide.value = index;
}
</script>

<style lang="scss" scoped>
.base-mini-photos {
  position: relative;

  &__slides {
    user-select: none;
    height: 100%;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    white-space: nowrap;
    scroll-snap-type: x mandatory;

    &--rounded {
      border-radius: 5px;
    }
  }

  &__slide {
    display: inline-block;
    scroll-snap-align: center;
    width: 100%;
    min-width: 100%;
    height: 100%;
    margin: 0 4px;
    box-sizing: content-box;
    object-fit: cover;
    border-radius: 0;
    &:first-child {margin-left: 0}
    &:last-child {margin-right: 0}
  }

  &__count {
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: white;
    background-color: rgba(0, 0, 0, .5);
    padding: 2px 8px;
    border-radius: 5px;
    font-size: $fs--mini;
  }

  &__modal {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: #1e1e20;
    z-index: 100;

    ::v-deep {
      .carousel__viewport, .carousel__track {
        height: 100% !important;
        margin: 0 !important;
      }
    }
  }

  &__modal-header {
    display: grid;
    align-items: center;
    grid-template-columns: 36px 1fr 36px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    background-color: #232325;
    height: 61px;
    z-index: 11;
  }

  &__modal-image {
    display: inline-block;
    scroll-snap-align: center;
    width: 100%;
    min-width: 100%;
    height: 100%;
    margin: 0 4px;
    box-sizing: content-box;
    object-fit: contain;
    border-radius: 0;
    &:first-child {margin-left: 0}
    &:last-child {margin-right: 0}
  }

  &__modal-slide {
    padding: 4px;
  }

}
</style>