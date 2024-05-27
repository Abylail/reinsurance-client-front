<template>
  <auth-page-wrapper
      title="SMS подтверждение"
      sub-title="На указанный номер придёт SMS с кодом для входа в учётную запись."
      head-title="Подтверждение смс - kidup.kz"
  >
    <otp-input class="confirm-page__input"/>
    <base-button full-width @click="submitHandle()">Далее</base-button>
    <base-button class="confirm-page__go-back" full-width type="naked" @click="$goBack('/auth/login')">Вернуться</base-button>
  </auth-page-wrapper>
</template>

<script setup>
import AuthPageWrapper from "../../components/common/auth/authPageWrapper";
import OtpInput from "../../components/common/auth/otpInput";
import BaseButton from "../../components/base/BaseButton";
const { $goBack } = useNuxtApp();

definePageMeta({
  layout: "empty",
})

const submitHandle = () => {

}
</script>

<style lang="scss" scoped>
.confirm-page {

  &__input {
    margin: 24px 0;
  }

  &__go-back {
    margin-top: 20px;
  }

}
</style>