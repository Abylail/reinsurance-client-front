<template>
  <div class="pack-card">
    <div class="pack-card__head">
      <div class="pack-card__name">{{ $getProp(info, 'name') }}</div>
      <div class="pack-card__description">{{ $getProp(info, 'description') }}</div>
    </div>

    <div class="pack-card__list">
      <div class="pack-card__item" v-for="(item, index) in list" :key="index">
        <div class="pack-card__item-image" :style="{backgroundImage: `url(${getImageUrl(item.photos[0])})`}"/>
        <div>{{ $getProp(item, 'name') }}</div>
      </div>
    </div>

    <div class="pack-card__footer">
      <div>Товаров: {{ list.length }} ({{ tokens }} токена)</div>
      <base-button class="pack-card__submit" type="yellow" full-width @click="submit()">Хочу!</base-button>
    </div>
  </div>
</template>

<script setup>
import ToyCard from "./toyCard";
import {computed} from "vue";
import {useRouter, useRuntimeConfig} from "nuxt/app";
import BaseButton from "../../base/BaseButton";
import {useToysCartStore} from "../../../store/announcement/basket";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const list = computed(() => props.info.list && JSON.parse(props.info.list) || [])
const tokens = computed(() => list.value.reduce((acc, item) => acc + item.token, 0))

const config = useRuntimeConfig();
const getImageUrl = url => config.public.CDN_URL + url;

const toysCartStore = useToysCartStore();
const router = useRouter();
const submit = () => {
  toysCartStore.addToys(list.value);
  router.push("/basket");
}
</script>

<style lang="scss" scoped>
.pack-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px 0 rgba(34, 60, 80, 0.2);
  margin-right: 16px;

  &__head {
    height: 94px;
    overflow: hidden;
  }

  &__name {
    display: flex;
    align-items: center;
    padding: 16px 16px 4px;
    white-space: normal;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__description {
    white-space: normal;
    font-size: $fs--mini;
    padding: 0 16px;
    color: $color--gray-dark;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__list {
    max-height: 200px;
    overflow: auto;
    margin-top: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    margin-bottom: 8px;
    min-width: 250px;
    max-width: 300px;
    white-space: normal;
  }

  &__item-image {
    height: 50px;
    width: 50px;
    min-width: 50px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
  }

  &__item-index {
    line-height: 30px;
    text-align: center;
    background-color: $color--blue;
    color: white;
    height: 30px;
    width: 30px;
    min-width: 30px;
    border-radius: 50%;
  }

  &__footer {
    border-top: 1px solid $color--gray;
    padding: 16px;
  }

  &__submit {
    margin-top: 8px
  }
}
</style>