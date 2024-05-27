<template>
  <div class="lang-switch">
    <div class="lang-switch__locale" :class="{active: $i18n.locale === 'ru'}" @click="switchLangHandle('ru')">Рус</div>
    <div class="lang-switch__locale" :class="{active: $i18n.locale === 'kz'}" @click="switchLangHandle('kz')">Каз</div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();

const switchLangHandle = lang => {
  nuxtApp.$i18n.locale = lang;
}
</script>

<style lang="scss" scoped>
.lang-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;

  &__locale {
    font-size: $fs--mini;
    &.active {
      color: $color--blue;
      border: 1px solid $color--blue;
      padding: 2px 6px;
      border-radius: 20px;
    }
  }

}
</style>