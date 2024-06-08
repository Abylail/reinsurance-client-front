<template>
  <header class="desktop-header">
    <div class="desktop-header__content">
      <div class="desktop-header__left">
        <nuxt-link to="/main">
          <nuxt-img class="desktop-header__logo" src="/logo.svg" alt="logo"/>
        </nuxt-link>
      </div>
      <div class="desktop-header__right">
        <nuxt-link
          class="desktop-header__module-link"
          :class="{'desktop-header__module-link--active': activeModule === module.code}"
          v-for="module in modules" :key="module.code"
          :to="`/${module.code}`"
        >
          {{ module.name }}
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import modules from "../../../config/modules";
import {computed} from "vue";
import {useRoute} from "nuxt/app";

const route = useRoute();
const activeModule = computed(() => route.path.split("/")[1] || "main")
</script>

<style lang="scss" scoped>
.desktop-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  border-bottom: 1px solid $color--gray-light;
  z-index: 1;
  background: $color--background-white;
  overflow: hidden;

  &__left, &__right {
    height: 100%;
  }

  &__logo {
    height: calc($header-height - 20px);
    padding: 10px 0;
  }

  &__module-link {
    display: inline-flex;
    align-items: center;
    height: $header-height;
    line-height: $header-height;
    color: $color--black;
    margin-left: 20px;
    transition: $transition;
    font-weight: bold;

    &--active {
      color: $color--blue;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 $side-space-desktop;
  }

  &__module-icon {
    margin-right: 4px;
  }
}
</style>