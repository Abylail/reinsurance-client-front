<template>
  <footer class="main-footer">
    <div class="container">

      <div>
        <nuxt-link class="main-footer__logo" to="/">
          <base-icon class="main-footer__logo-icon" name="mdi-safety-goggles"/>
          Reinsurance
        </nuxt-link>
      </div>

      <div class="main-footer__block main-footer__links">
        <nuxt-link to="/">Продаю</nuxt-link>
        <nuxt-link to="/">Покупаю</nuxt-link>
        <nuxt-link to="/">Брокер</nuxt-link>
      </div>

      <div class="main-footer__block">
        <h3 class="main-footer__sub-title">Контакты</h3>
        <div class="main-footer__links">
          <div class="main-footer__contact">
            <base-icon name="mdi-email-outline"/>
            test@test.kz
          </div>
          <div class="main-footer__contact">
            <base-icon name="mdi-phone-message-outline"/>
            +7 (777) 777-77-77
          </div>
        </div>
      </div>

      <div class="main-footer__block">
        <h3 class="main-footer__sub-title">Адрес</h3>
        <div class="main-footer__links">
          <div class="main-footer__contact">
            <base-icon name="mdi-map-marker-outline"/>
            Алматы. Абая 69, уг. Ауезова
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
</script>

<style lang="scss" scoped>
.main-footer {
  background-color: $color--gray-lighter;
  padding: 2rem 0;

  &__logo {
    font-size: $fs--title;
    font-weight: bolder;
  }

  &__logo-icon {
    background-color: white;
    padding: .5rem;
    border-radius: 50%;
  }

  &__block {
    margin: 1rem 0;
  }

  &__links {
    display: flex;
    gap: 1rem;
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: .5rem;
    font-size: $fs--default;
  }

  &__sub-title {
    font-weight: normal;
    color: $color--gray;
  }
}
</style>