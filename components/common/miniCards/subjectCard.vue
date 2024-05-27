<template>
  <nuxt-link class="subject-card" :class="{'subject-card--full': full}" :to="`/catalog/details/lesson-${subjectId}`" @click="lessonCard(info?.subject)">

    <div class="subject-card__head">
      <div class="subject-card__name">{{ props.info?.name }}</div>
      <div class="subject-card__center">{{ centerName }}</div>
    </div>

    <div class="subject-card__description"><base-cut-text :text="props.info?.description"/></div>

    <!-- Фото + контент -->
    <div class="subject-card__content">
      <base-mini-photos class="subject-card__photos" v-if="info?.photos?.length" :list="info.photos"/>
      <div class="subject-card__info">
        <div class="subject-card__info-item" v-if="priceRange">
          <base-icon class="subject-card__icon" name="mdi-cash" size="24"/>
          <span>{{ priceRange }}</span>
        </div>
        <div class="subject-card__info-item" v-if="ageRange">
          <base-icon class="subject-card__icon" name="mdi-baby-face-outline" size="24"/>
          <span>{{ ageRange }}</span>
        </div>
        <div class="subject-card__info-item" v-if="addresses">
          <base-icon class="subject-card__icon" name="mdi-map-marker-outline" size="24"/>
          <span>{{ addresses }}</span>
        </div>
        <div class="subject-card__info-language">
          <div class="chip" v-if="langRu">Русский</div>
          <div class="chip" v-if="langKz">Казахский</div>
        </div>
      </div>
    </div>

    <!-- Группы -->
    <div class="subject-card__bottom-block" v-if="props.full && subjectWeekdays.length">
      <div class="subject-card__weekdays-title">В какие дни есть уроки:</div>
      <div class="subject-card__bottom-block-content">
        <div class="subject-card__weekdays">
          <div class="subject-card__weekday" v-for="(weekday, windex) in subjectWeekdays" :key="windex">{{ weekday.shortName }}</div>
        </div>
        <base-button size="mini" @click.prevent="goTimetable()">Записаться</base-button>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";
import BaseCutText from "../../base/BaseCutText";
import BaseButton from "../../base/BaseButton";
import {useRouter} from "nuxt/app";

import {lessonCard, lessonCardButton} from "../../../utlis/analitics";

const props = defineProps({
  info: Object,
  full: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const subjectId = computed(() => props.info?.id)

// Получить время уроков группы
const getGroupTimes = group => weekdayList
    .filter(weekday => group[`${weekday.code}_start`])
    .map(weekday => ({title: weekday.shortName, time: group[`${weekday.code}_start`]}))

const groups = computed(() => props.info?.institutionGroups || []);

const subjectWeekdays = computed(() => weekdayList.filter(weekday => groups.value.some(g => g[`${weekday.code}_start`])))

// Цена
const priceRange = computed(() => {
  let minPrice = null;
  let maxPrice = null;
  groups.value.forEach(group => {
    if (typeof group.price === "number") {
      if (!minPrice || group.price < minPrice) minPrice = group.price;
      if (!maxPrice || group.price > maxPrice) maxPrice = group.price;
    }
  })
  return (minPrice === maxPrice ? (minPrice || "") : `${minPrice} - ${maxPrice}`) + ((minPrice || maxPrice) ? " ₸/мес" : "");
})

// Возраст
const ageRange = computed(() => {
  let minAge = null;
  let maxAge = null;
  groups.value.forEach(group => {
    if (typeof group.price === "number") {
      if (!minAge || group.min_age < minAge) minAge = group.min_age;
      if (!maxAge || group.max_age > maxAge) maxAge = group.max_age;
    }
  })
  return (minAge && `от ${minAge}` || "") + (maxAge && ` до ${maxAge}` || "") + ((minAge || maxAge) ? " лет" : "");
})

// Цвет предмета
const subjectColor = computed(() => props.info?.subject?.color || "#f1f1f1");

// Название центра
const centerName = computed(() => props.info?.institution?.name);

// Каз яз
const langKz = computed(() => groups.value.some(group => group.language_kz));

// Рус яз
const langRu = computed(() => groups.value.some(group => group.language_ru));

// Адреса
const addresses = computed(() => {
  if (!groups.value.length) return null;
  const isAddressesSame = groups.value?.every(g => g.institutionBranch?.id === groups.value[0]?.institutionBranch?.id);
  return isAddressesSame ? groups.value[0]?.institutionBranch?.address : groups.value?.map(g => g.value?.institutionBranch?.address).join(", ")
})

const goTimetable = () => {
  router.push({path: `/catalog/details/lesson-${subjectId.value}`, hash: "#timetable"})
  lessonCardButton(props.info?.subject)
}
</script>

<style lang="scss" scoped>
.subject-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid $color--gray-light;

  &--full {
    width: 100%;
    max-width: none;
    border: none;
    box-shadow: 0px 4px 10px 0px rgba(34, 60, 80, 0.2);
    border-radius: 0;
    background: white;
  }

  &__head {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    padding: 0 $side-space-mobile;
    * {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__name {
    flex: 1;
    font-size: $fs--default;
    font-weight: bold;
  }

  &__center {
    flex: 1;
    color: $color--blue;
    font-size: $fs--mini;
    line-height: $fs--mini;
    max-height: 2*$fs--mini;
    text-overflow: ellipsis;
    text-align: right;
  }

  &__content {
    display: flex;
    padding: 0 $side-space-mobile;
  }

  &__action {
    text-align: right;
    margin-top: 16px;
    padding-right: $side-space-mobile;
  }

  &__photos {
    height: 120px;
    width: 150px;
    min-width: 150px;
    padding-right: 8px;
    background-color: white;
  }

  &__info {
    flex-grow: 1;
    font-size: $fs--mini;
    white-space: normal;
  }

  &__description {
    color: $color--gray-dark;
    padding: 8px $side-space-mobile;
    font-size: $fs--mini;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  &__info-item {
    display: flex;
    align-items: center;
    font-size: $fs--mini;
    line-height: 1;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  &__info-language {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: $fs--mini;
    line-height: 1;
    margin-top: 8px;
  }

  &__bottom-block-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 8px;
  }

  &__address {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding: 0 $side-space-mobile;
  }

  &__icon {
    color: $color--orange;
    margin-right: 4px;
  }

  &__bottom-block {
    padding: $side-space-mobile $side-space-mobile 0;
    margin-top: $side-space-mobile;
    border-top: 1px solid $color--gray;
  }

  &__weekdays {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
  }

  &__weekday {
    border-radius: 3px;
    padding: 3px 8px;
    margin-right: 5px;
    color: $color--blue;
    background-color: $color--blue-light;
    font-size: $fs--mini;
    text-align: center;
  }

  &__weekdays-title {
    color: $color--gray-dark;
    margin-right: 4px;
    margin-bottom: 8px;
  }
}
</style>