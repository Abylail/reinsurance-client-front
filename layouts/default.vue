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

</template>

<script setup>
import MobileFooter from "../components/common/layoutComponents/mobileFooter";
import DesktopHeader from "../components/common/layoutComponents/desktopHeader";
import {computed} from "vue";
import {useRoute, useRouter} from "nuxt/app";
import AuthModal from "../components/common/auth/authModal";
import {useAuthStore} from "../store/parent/auth";
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
  title: "Kidrent - подписка на детские товары",
  ogTitle: "Kidrent - подписка на детские товары",
  description: "Берите любые детские товары по подписке. Коляски, манежи, товары для развития ребенка, эрго рюкзаки, пеленальный стол и многое другое.",
  ogDescription: "Берите любые детские товары по подписке. Коляски, манежи, товары для развития ребенка, эрго рюкзаки, пеленальный стол и многое другое.",
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
</style>