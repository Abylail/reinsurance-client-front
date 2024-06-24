<template>
  <div class="card-list">
    <div class="card-list__top-head container" v-if="subTitle">
      <div class="card-list__subtitle">{{ subTitle }}</div>
    </div>
    <div class="card-list__head container">
      <h2 class="card-list__title title">{{ props.title }}</h2>
      <nuxt-link class="card-list__go-all" v-if="props.to" :to="props.to">Смотреть все</nuxt-link>
    </div>

    <!-- Лоудер -->
    <div class="card-list__content container" v-if="loading">
      <div class="card-list__card-loading skeleton-loading" v-for="(_, index) in loadingCount" :key="index"/>
    </div>

    <!-- Карточки -->
    <div class="card-list__content container" v-else>
      <slot/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subTitle: String,
  to: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingCount: {
    type: Number,
    default: 4
  }
})
</script>

<style lang="scss" scoped>
.card-list {
  padding-top: 12px;
  //background-color: white;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__subtitle {
    color: $color--gray-dark;
  }

  &__go-all {
    color: $color--blue;
    //font-weight: bold;
  }

  &__card-loading {
    width: 300px;
    min-width: 300px;
    height: 200px;
    border-radius: 5px;
  }

  &__content {
    display: flex;
    white-space:nowrap;
    overflow-x: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    scroll-snap-type: x mandatory;

    // Для элементов внутри контента
    ::v-deep {
      & > * {
        margin-right: 10px;
        scroll-snap-align: center;
      }
    }
  }

}
</style>