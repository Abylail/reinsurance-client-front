<template>
  <div class="main-page">

    <!-- Инфо блок -->
    <div class="main-page__block container">
      <div class="main-page__content-double">
        <div>
          <h1 class="main-page__title">Перестрахование – это сложно. Мы делаем это легко.</h1>
          <p class="main-page__description">Мощная аналитика, упрощенные операции и лучшее сотрудничество с нашей платформой перестрахования для:</p>
        </div>
        <NuxtImg class="main-page__image" src="/images/landing/contract.png" alt="contract" v-if="$device.isDesktop"/>
      </div>
    </div>

    <!-- Выбор роли -->
    <div class="main-page__block--more-space container">
      <div class="role-cards">
      <nuxt-link class="role-cards__card role-cards__card--blue" to="/">
        <div class="role-cards__head">
          <span class="role-cards__title">Продаю риски</span>
          <base-icon name="mdi-arrow-top-right" size="32"/>
        </div>
        <div class="role-cards__description">Оптимизируйте подготовку данных, автоматизируйте отправку пакетов и сотрудничайте с перестрахователями.</div>
      </nuxt-link>

      <nuxt-link class="role-cards__card role-cards__card--purple" to="/">
        <div class="role-cards__head">
          <span class="role-cards__title">Покупаю риски</span>
          <base-icon name="mdi-arrow-top-right" size="32"/>
        </div>
        <div class="role-cards__description">Изучайте глубокий анализ наших риск моделей и покупайте самые безопасные риски.</div>
      </nuxt-link>

      <nuxt-link class="role-cards__card role-cards__card--red" to="/">
        <div class="role-cards__head">
          <span class="role-cards__title">Брокер</span>
          <base-icon name="mdi-arrow-top-right" size="32"/>
        </div>
        <div class="role-cards__description">Создавайте индивидуальные сделки, улучшайте поток сделок и обеспечивайте надежное представление рисков перестраховщикам.</div>
      </nuxt-link>
      </div>
    </div>

    <div class="main-page__block--more-space container">
      <h2 class="main-page__title">
        <base-icon class="main-page__title-icon" name="mdi-chart-line" size="40"/>
        Все что вам нужно, в одном месте
      </h2>
      <div class="main-page__block-content">
        <p class="main-page__description">
          Наша платформа дает вам полную аналитику о лотах, это не только ускорит вашу работу, но и сделает ваши сделки более безопасными.
        </p>
      </div>

      <h3 class="main-page__sub-title">Подготовка данных</h3>
      <NuxtImg class="main-page__image--nano" src="/images/landing/ai.png"/>
      <p class="main-page__description">
        Наши ИИ модели позволяют предсказывать вероятность различных рисков, обеспечивая точные данные для принятия решений и снижения убытков.
        <br/><br/>
        Мы их уже сравнили соотношением цены и рисков, вам осталось только зайти в платформу и выбрать более безопасную сделку.
      </p>

      <h3 class="main-page__sub-title">Визуализация данных</h3>
      <NuxtImg class="main-page__image--nano" src="/images/landing/analytics.png"/>
      <p class="main-page__description">
        Полная визуализация исходных данных и аналитики, вашим сотрудникам не надо переучиваться.
        <br/><br/>
        Интуитивно понятный дизайн - вы легко сможете считывать большие объемы данных.
      </p>

      <h3 class="main-page__sub-title">Сделки</h3>
      <NuxtImg class="main-page__image--nano" src="/images/landing/contract.png"/>
      <p class="main-page__description">
        Заключайте сделки внутри платформы быстро и безопасно.
        <br/><br/>
        Для заключение сделки вам надо лишь нажать пару кнопок.
      </p>
    </div>

    <div class="main-page__block--more-space main-page__block--blue">
      <div class="container main-page__call-block">
        <h2 class="main-page__title">Начните уже сейчас</h2>
        <p class="main-page__description">Если у вас остались вопросы, связитесь с нами</p>
        <button class="main-page__action-btn">Свяжитесь с нами</button>
        <NuxtImg class="main-page__image--mini" src="/images/landing/callCenter.png"/>
      </div>
    </div>

    <div class="main-page__block--more-space container">
      <h2 class="main-page__title">
        <base-icon class="main-page__title-icon" name="mdi-bullseye-arrow" size="40"/>
        Наша миссия
      </h2>
      <p class="main-page__description">
        Мы стремимся обеспечить страховым и финансовым компаниям защиту их активов, минимизировать риски и сохранить стабильность даже в условиях самых непредсказуемых событий.
        <br/><br/>
        Мы помогаем страховым компаниям осуществить сделку перестрахования быстро и безопасно.
        <br/><br/>
        Наша команда аналитиков оценивает портфель страховых компаний и верифицировать клиентов.
      </p>
    </div>
  </div>
</template>

<script setup>
const {$device} = useNuxtApp();
</script>

<style lang="scss" scoped>
.main-page {

  &__block {
    margin: 1rem auto;
    &--more-space {margin: 4rem auto;}

    &--blue {
      background-color: $color--blue-light;
      padding: 1rem 0;
      color: white;
    }
  }

  &__content-double {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: $fs--title;
    margin: 1rem 0;
  }

  &__sub-title {
    display: flex;
    align-items: center;
    font-size: $fs--sub-title;
    margin: 1.5rem 0 0.5rem;
    font-weight: 600;
  }

  &__title-icon {
    margin-right: 0.5rem;
  }

  &__description {
    font-size: $fs--default;
    max-width: 600px;
  }

  &__image {
    width: 100%;
    max-width: 400px;
    &--mini {
      width: 80%;
      max-width: 300px;
    }
    &--nano {
      width: 60%;
      max-width: 250px;
    }
  }

  &__call-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    text-align: center;
  }

  &__action-btn {
    display: block;
    width: 100%;
    padding: 1rem 2rem;
    background-color: #3d479f;
    color: white;
    margin: 1rem auto 0;
    font-size: $fs--sub-title;
    border-radius: .5rem;
  }

}

.role-cards {

  &__card {
    display: block;
    padding: 1rem;
    margin: 1rem 0;

    &--blue {
      background-color: $color--blue-lighter;
      color: $color--blue-light;
    }

    &--purple {
      background-color: $color--purple-lighter;
      color: $color--purple;
    }

    &--red {
      background-color: $color--red-lighter;
      color: $color--red;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: $fs--title;
    font-weight: 500;
  }

  &__description {
    font-size: $fs--mini;
    color: $color--font-dark;
  }
}
</style>
<script>
import BaseIcon from "~/components/base/BaseIcon";
export default {
  components: {BaseIcon}
}
</script>