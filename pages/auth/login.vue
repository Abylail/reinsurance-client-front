<template>
  <auth-page-wrapper
      title="Вход / регистрация"
      sub-title="Если вы когда либо записывались в нашем сервисе, то у вас уже есть учётная запись закреплённая за вашим номером."
      head-title="Авторизация - kidup.kz"
  >
    <base-input
        class="login-page__input"
        title="Введите номер телефона"
        v-model="phone"
        prev-icon="mdi-phone-outline"
        autofocus
        phone
    />
    <base-button full-width @click="submitHandle()">Далее</base-button>
    <base-button class="login-page__go-back" full-width type="naked" @click="$goBack('/')">Вернуться</base-button>
  </auth-page-wrapper>
</template>

<script setup>
import {ref} from "vue";
import BaseInput from "../../components/base/BaseInput";
import BaseButton from "../../components/base/BaseButton";
import AuthPageWrapper from "../../components/common/auth/authPageWrapper";
const { $goBack } = useNuxtApp();

definePageMeta({
  layout: "empty",
})

const phone = ref("");

const router = useRouter();
const submitHandle = () => {
  router.push("/auth/confirm")
}
</script>

<style lang="scss" scoped>
.login-page {

  &__input {
    margin: 24px 0;
  }

  &__go-back {
    margin-top: 20px;
  }
}
</style>