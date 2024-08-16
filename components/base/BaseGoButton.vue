<template>
  <button class="go-button" :class="`go-button--${props.type}`" v-bind="$attrs">
    <base-icon class="go-button__icon" :name="icon"/>
    <div class="go-button__content">
      <span class="go-button__title">{{ title }}</span>
      <span class="go-button__subtitle" v-if="subTitle">{{ subTitle }}</span>
    </div>
    <base-icon name="mdi-chevron-right"/>
  </button>
</template>

<script setup>
import BaseIcon from "./BaseIcon";

const props = defineProps({
  title: String,
  subTitle: String,
  icon: String,
  type: {
    type: String,
    default: "default",
    validator: t => ["default", "bright", "outlined"].includes(t)
  }
})
</script>

<style lang="scss" scoped>
.go-button {
  display: grid;
  grid-template-columns: 40px 1fr 24px;
  grid-column-gap: 10px;
  align-items: center;
  font-size: $fs--default;
  width: 100%;
  padding: 10px;
  min-height: 64px;
  border-radius: 14px;
  text-align: left;

  &__icon {
    padding: 8px;
    border-radius: 14px;
    color: $color--blue;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 600;
  }

  &__subtitle {
    color: $color--gray-dark;
  }

  // Типы
  &--default {
    background: white;
    color: $color--black;
    .go-button__icon {color: $color--blue;}
    .go-button__subtitle {color: $color--gray-dark;}
  }
  &--bright {
    background: #ff8334;
    color: white;
    .go-button__icon {color: white;}
    .go-button__subtitle {color: $color--gray-light;}
  }
  &--outlined {
    background: white;
    color: $color--black;
    border: 1px solid $color--blue;
    .go-button__icon {color: $color--blue;}
    .go-button__subtitle {color: $color--gray-dark;}
  }
}
</style>