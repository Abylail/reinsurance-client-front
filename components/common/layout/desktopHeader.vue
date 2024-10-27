<template>
  <header class="desktop-header">
    <div class="container desktop-header__container">
      <div class="desktop-header__left">
        <nuxt-link class="desktop-header__logo" to="/">
          <base-icon name="mdi-safety-goggles"/>
          Reinsurance
        </nuxt-link>
      </div>
      <div class="desktop-header__right">
        <nuxt-link to="/">Продаю</nuxt-link>
        <nuxt-link to="/">Покупаю</nuxt-link>
        <nuxt-link to="/">Брокер</nuxt-link>
        <button class="desktop-header__login">Войти</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
</script>

<style lang="scss" scoped>
.desktop-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: $side-space 0;
  border-bottom: 1px solid $color--gray-light;
  background-color: white;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-size: $fs--title;
    font-weight: bolder;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__login {
    font-size: $fs--default;
    padding: 0.5rem 1rem;
    background-color: $color--blue;
    color: white;
    border-radius: .25rem;
  }
}
</style>