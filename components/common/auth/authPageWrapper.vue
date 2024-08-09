<template>
  <div class="auth-page">

    <div class="auth-page__logo"/>

    <div class="auth-page__card">
      <h1 class="title">{{ props.title }}</h1>
      <p>{{ props.subTitle }}</p>
      <slot/>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subTitle: String,
  headTitle: String
})

useHead({
  title: props.headTitle,
  bodyAttrs: {
    class: 'background-blue-illustration no-scroll'
  },
})
</script>

<style lang="scss" scoped>
.auth-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px $side-space-mobile;
  overflow: hidden;

  &__logo {
    flex-grow: 1;
    width: 100%;
    margin-bottom: 40px;
    background-image: url('/logo.svg');
    background-position: center;
    background-repeat: no-repeat;
    max-height: 250px;
  }

  &__card {
    max-width: 500px;
    padding: 12px;
    background: $color--background-white;
    border-radius: 10px;
  }
}
</style>