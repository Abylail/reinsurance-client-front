<template>
  <div class="categories">

    <div class="categories__list">
      <nuxt-link
        class="categories__item"
        :class="{'categories__item--selected': isSelected()}"
        to="/announcements"
      >
        <base-icon name="mdi-dots-grid" size="36"/>
        <span class="categories__item-title">Все</span>
      </nuxt-link>

      <nuxt-link
        class="categories__item"
        :class="{'categories__item--selected': isSelected(category.code)}"
        v-for="category in categoryStore.getList" :key="category.code"
        :to="`/announcements/${category.code}`"
      >
        <base-icon :name="category.icon_mdi" size="36"/>
        <span class="categories__item-title">{{ category.name_ru }}</span>
      </nuxt-link>
    </div>

  </div>
</template>

<script setup>
import {useCategoriesStore} from "../../../store/categories";
import BaseIcon from "../../base/BaseIcon";

const props = defineProps({
  activeCode: String,
  showSelected: Boolean,
})

const categoryStore = useCategoriesStore();
await categoryStore.fetchList();

const isSelected = (code = "") => props.showSelected && code === props.activeCode;
</script>

<style lang="scss" scoped>
.categories {

  &__list {
    display: flex;
    flex-direction: row;
    align-self: center;
    gap: 16px;
    overflow: auto;
    padding: 16px 0;
  }

  &__item {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color--green;
    aspect-ratio: 5/4;
    padding: 4px;
    gap: 8px;
    text-align: center;
    background: white;
    border-radius: 12px;
    min-width: 80px;
    border: 2px solid transparent;

    &--selected {
      border-color: currentColor;
    }
  }

  &__item-title {
    font-size: $fs--nano;
  }
}
</style>