<template>
  <mobile-header title="Профиль"/>

  <!-- Авторизованный -->
  <div class="account">

    <div class="account__block">
      <div class="account__title">Мои данные</div>
      <personal-data/>

      <base-go-button
          class="account__go"
          title="Мои избранные"
          icon="mdi-heart"
          type="outlined"
          @click="router.push('/account/favorite')"
      />

      <base-go-button
          class="account__go"
          title="Мои покупки"
          icon="mdi-cart-variant"
          type="outlined"
          @click="router.push('/account/purchases')"
      />

      <div class="account__title">Мои объявления</div>
      <base-go-button
          class="account__share-list"
          title="Поделитесь объявлениями"
          sub-title="Вы можете отправить ссылку на ваши объявления"
          icon="mdi-share-circle"
          type="bright"
          @click="shareHandle()"
      />
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
import BaseGoButton from "../../components/base/BaseGoButton";
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

// Поделиться объявлениями
const shareHandle = () => {
  const shareData = {
    url: `https://flico.kz//announcements/seller-${authStore.getClientData.id}`,
    title: `Мои объявления на Flico.kz`,
  };

  if (window.navigator.canShare(shareData)) navigator.share(shareData);
}
</script>

<style lang="scss" scoped>
.account {
  padding: 0 $side-space-mobile;
  width: calc(100% - 2*#{$side-space-mobile});
  max-width: 500px;
  margin: 0 auto;

  &__title {
    font-size: $fs--title;
    margin-top: 1rem;
    margin-bottom: .5rem;
  }

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

  &__go {
    margin-top: 1rem;
  }

  &__share-list {
    margin: 1rem 0;
  }

}
</style>