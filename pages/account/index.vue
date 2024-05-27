<template>
  <mobile-header title="Профиль"/>

  <!-- Авторизованный -->
  <div class="account">

    <div class="account__block">
      <div class="title">Мои данные</div>
      <personal-data/>
      <my-announcements/>
    </div>

  </div>

  <auth-modal v-model:open="openAuth"/>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import PersonalData from "../../components/common/account/personalData";
import {useAuthStore} from "../../store/parent/auth";
import AuthModal from "../../components/common/auth/authModal";
import BaseButton from "../../components/base/BaseButton";
import {useRouter} from "nuxt/app";
import MyAnnouncements from "../../components/common/account/myAnnouncements";
import {ref} from "vue";
const authStore = useAuthStore();

const openAuth = ref(false);

// Перейти в детализацию записи
const router = useRouter();
const selectRegistration = registration => {
  router.push(`/account/registrations/${registration.id}`)
}

useSeoMeta({
  title: "Kidup - личный кабинет",
  ogTitle: "Kidup - личный кабинет",
})

definePageMeta({
  middleware: "auth"
})
</script>

<style lang="scss" scoped>
.account {
  padding: 0 $side-space-mobile;

  &__block {
    &:first-child {margin-top: 16px}
    margin: 32px 0;
  }

  &__user-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__auth {
    text-align: center;
    margin-top: 200px;
  }

  &__auth-text {
    color: $color--gray-dark;
    margin: 12px 0;
  }

}
</style>