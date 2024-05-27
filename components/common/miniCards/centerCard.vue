<template>
  <nuxt-link class="center-card" :class="{'center-card--full': props.full}" :to="`/catalog/details/center-${info.id}`" @click="centerCard(info)">

    <div class="center-card__head">
      <div>
        <img class="center-card__logo" v-if="logoUrl" :src="logoUrl" alt="logo"/>
        <div class="center-card__name">{{ info.name }}</div>
      </div>
    </div>

    <div class="center-card__description"><base-cut-text :text="info.description"/></div>

    <!-- Время работы -->
    <div class="center-card__info" v-if="workTime">
      <base-icon class="center-card__info-icon" name="mdi-clock-time-eight-outline" size="20"/>
      <span class="center-card__info-text">{{ workTime }}</span>
    </div>

    <!-- Адреса -->
    <div class="center-card__info" v-for="(address, index) in addresses" :key="index">
      <base-icon class="center-card__info-icon" name="mdi-map-marker-outline" size="20"/>
      <span class="center-card__info-text">{{ address }}</span>
    </div>

    <div class="center-card__subjects">
      <p class="center-card__subjects-title">Все уроки:</p>
      <base-cut-text :text="subjectNames"/>
    </div>

  </nuxt-link>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";
import {useRuntimeConfig} from "nuxt/app";
import BaseCutText from "../../base/BaseCutText";

import {centerCard} from "../../../utlis/analitics";


const config = useRuntimeConfig();

const props = defineProps({
  full: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => ({})
  }
})

// Ссылка на лого
const logoUrl = computed(() => props.info?.logo && (config.public.CDN_URL + props.info?.logo) || null);

// Список предметов
const subjects = computed(() => (props.info?.institutionSubjects || []));
const subjectNames = computed(() => subjects.value.map(({name}) => name).join(", "));

// Время работы
const workTime = computed(() => props.info.end_time && props.info.start_time && `${props.info.start_time}-${props.info.end_time}` || null)

const addresses = computed(() =>  props.info?.institutionBranches.map(({address}) => address))
</script>

<style lang="scss" scoped>
.center-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid $color--gray-light;
  max-width: 500px;

  &--full {
    display: flex;
    width: 100%;
    max-width: none;
    border-right: none;
    border-left: none;
    background-color: white;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $side-space-mobile;
    height: 40px;
    & > * {
      display: flex;
      align-items: center;
    }
  }

  &__logo {
    width: 32px;
    height: 32px;
    background: white;
    padding: 4px;
    border-right: 60px;
    margin-right: 6px;
    border-radius: 32px;
  }

  &__name {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    line-height: 1;
    white-space: normal;
    max-height: 2rem;
  }

  &__rating-text {
    font-size: $fs--mini;
  }

  &__rating-icon {
    color: $color--yellow;
  }

  &__description {
    color: $color--gray-dark;
    margin: 8px 0;
    padding: 0 $side-space-mobile;
    white-space: normal;
    font-size: $fs--mini;
  }

  &__subjects {
    margin: 8px 0;
    padding: 0 $side-space-mobile;
    font-size: $fs--mini;
    white-space: normal;
  }

  &__subjects-title {
    display: block;
    font-weight: bold;
  }

  &__info {
    display: flex;
    align-items: center;
    margin: 2px 0;
    padding: 0 $side-space-mobile;
  }

  &__info-icon {
    color: $color--blue;
    margin-right: 4px;
  }

  &__info-text {
    font-size: $fs--mini;
  }

}
</style>