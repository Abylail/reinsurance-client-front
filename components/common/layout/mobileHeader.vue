<template>
  <header class="mobile-header">
    <div class="container mobile-header__container">
      <div class="mobile-header__left">
        <nuxt-link class="mobile-header__logo" to="/">
          <base-icon name="mdi-safety-goggles"/>
          Reinsurance
        </nuxt-link>
      </div>
      <div class="mobile-header__right">
        <button @click="showMenuToggle()">
          <base-icon name="mdi-menu" size="30" v-if="!showMenu"/>
          <base-icon name="mdi-close" size="30" v-else/>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-header-menu" :class="{'mobile-header-menu--show': showMenu}">
    <div class="container" @click="showMenuToggle()">
      <div class="mobile-header-menu__links">
        <nuxt-link to="/">Продаю</nuxt-link>
        <nuxt-link to="/">Покупаю</nuxt-link>
        <nuxt-link to="/">Брокер</nuxt-link>
      </div>

      <button class="mobile-header-menu__contact-us">Свяжитесь с нами</button>
      <div class="mobile-header-menu__login-wrapper">
        <button class="mobile-header-menu__login">Войти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
const showMenu = ref(false);

const showMenuToggle = () => showMenu.value = !showMenu.value;
</script>

<style lang="scss" scoped>
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: $side-space 0;
  border-bottom: 1px solid $color--gray-light;
  background-color: white;
  z-index: 3;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-size: $fs--title;
    font-weight: bolder;
  }
}

.mobile-header-menu {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  background-color: white;
  transform: translateX(100%);
  opacity: 0;
  transition: .15s;
  padding-top: 100px;

  &--show {
    transform: translateX(0);
    opacity: 1;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__contact-us {
    display: block;
    width: 100%;
    font-size: $fs--default;
    padding: .75rem 1rem;
    border: 1px solid $color--blue;
    color: $color--blue;
    border-radius: .25rem;
    margin-top: 4rem;
  }

  &__login-wrapper {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid $color--gray;
  }

  &__login {
    display: block;
    width: 100%;
    font-size: $fs--default;
    padding: .75rem 1rem;
    background-color: $color--blue;
    color: white;
    border-radius: .25rem;
  }
}
</style>