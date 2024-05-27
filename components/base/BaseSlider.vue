<template>
  <carousel :items-to-show="1.35" :autoplay="myAutoplay">
    <slide v-for="(mediaSrc, index) in list" :key="index">
      <slot :name="`slide-${index}`">
        <img class="base-media__slide" :alt="`slide-${index}`" :src="mediaSrc"/>
      </slot>
    </slide>
  </carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {computed} from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [
      'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    ]
  },
  autoplay: {
    type: Boolean,
    default: false
  }
})

const myAutoplay = computed(() => props.autoplay ? 5000 : 0)
</script>

<style lang="scss" scoped>
.base-media {

  &__slide {
    height: 150px;
    object-fit: cover;
    width: max-content;
    border-radius: 10px;
  }

}

::v-deep {
  .carousel__track {
    margin: 0;
  }

  //.carousel__slide {
  //  transition: $transition;
  //  min-width: 66vw;
  //}
  //
  //.carousel__slide--prev {
  //  opacity: 1;
  //  transform: rotateY(-20deg);
  //}
  //
  //.carousel__slide--next {
  //  opacity: 1;
  //  transform: rotateY(20deg);
  //}
  //
  //.carousel__slide--active {
  //  opacity: 1;
  //  transform: rotateY(0);
  //  min-width: 74vw;
  //}
}
</style>