<template>

  <!-- Desktop -->
  <div v-if="$device.isDesktop">
    <desktop-header/>
    <main class="main-desktop"><slot/></main>
  </div>

  <!-- Mobile -->
  <div v-else>
    <main class="main-mobile"><slot/></main>
    <mobile-footer/>
  </div>

  <auth-modal v-model:open="isAuthModal"/>

  <!-- Службв поддержки -->
  <a class="default-layout__help" href="https://wa.me/77753862246" target="_blank" title="Помощь">
    <base-icon name="mdi-chat-question-outline" size="30"/>
  </a>

</template>

<script setup>
import MobileFooter from "../components/common/layoutComponents/mobileFooter";
import DesktopHeader from "../components/common/layoutComponents/desktopHeader";
import {computed} from "vue";
import {useRoute, useRouter} from "nuxt/app";
import AuthModal from "../components/common/auth/authModal";
import {useAuthStore} from "../store/parent/auth";
import BaseIcon from "../components/base/BaseIcon";
const { $device } = useNuxtApp();

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();
const isAuthModal = computed({
  get: () => !authStore.isAuth && route.query.login !== undefined,
  set: (val) => {
    if (!authStore.isAuth) router.replace({query: {...route.query, login: undefined}})
    else if (route.query.login) router.push(route.query.login || "/");
    else if (!val) router.replace({query: {...route.query, login: null}})
  }
})

useSeoMeta({
  title: "Kidrent - продажа и покупка детских товаров",
  ogTitle: "Kidrent - продажа и покупка детских товаров",
  description: "От мамы к маме. Продавайте детские товары из которых ребенок вырос и покупайте новые.",
  ogDescription: "От мамы к маме. Продавайте детские товары из которых ребенок вырос и покупайте новые.",
})
</script>

<style lang="scss" scoped>
.main-desktop {
  max-width: $max-width;
  margin: 0 auto;
  padding: $header-height $side-space-desktop 0;
}

.main-mobile {
  padding-bottom: 100px;
  background-color: $color--gray-light;
  min-height: calc(#{100vh} - 100px);
}

.default-layout {

  &__help {
    background: white;
    position: fixed;
    bottom:  6rem;
    right:  1rem;
    padding: .5rem;
    border-radius: 4rem;
    color: $color--green;
    border: 1px solid $color--green;
  }

}
</style>