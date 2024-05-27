<template>
  <div class="search-select-type">
    <div class="search-select-type__list">
      <nuxt-link class="search-select-type__item" to="/catalog/almaty/centers">
        <span class="search-select-type__item-name">Детские центры</span>
        <base-icon class="search-select-type__item-arrow" size="24" name="mdi-chevron-right"/>
      </nuxt-link>
      <nuxt-link class="search-select-type__item" to="/catalog/almaty/lessons">
        <span class="search-select-type__item-name">Уроки и курсы</span>
        <base-icon class="search-select-type__item-arrow" size="24" name="mdi-chevron-right"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
</script>

<style lang="scss" scoped>
.search-select-type {
  background-color: white;
  padding: 0 $side-space-mobile;

  &__item {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
    font-size: $fs--default;
    font-weight: bold;
  }

  &__item-arrow {
    color: $color--blue;
  }
}
</style>