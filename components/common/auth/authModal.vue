<template>
  <!-- Авторизация -->
  <base-backdrop :active="props.open" :title="title" @update:active="emit('update:open', $event)">

    <div class="auth__content" v-if="step === 1">
      <base-input
          v-model="phone"
          :title="$t('mobile_phone')"
          type="naked-gray"
          placeholder="+7 (000) 000-00-00"
          prev-icon="mdi-phone-outline"
          phone
      />
      <base-button
          class="auth__submit"
          :class="{disabled: !phoneValid}"
          :loading="isLoading"
          full-width
          @click="sendSmsHandle()"
      >{{ props.smsButtonTitle || $t('send_code') }}</base-button>
    </div>

    <div class="auth__content" v-if="step === 2">
      <otp-input v-model="otp" :error="!!error" @submit="submitOtp()"/>
      <div class="auth__hint">{{ $t('enter_send_code') }}</div>
      <div class="auth__error" v-if="error">{{ error }}</div>
      <base-button
          class="auth__submit"
          :class="{disabled: !otpValid}"
          :loading="isLoading"
          full-width
          @click="submitOtp()"
      >{{ props.enterButtonTitle || $t('enter') }}</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseButton from "../../base/BaseButton";
import {useAuthStore} from "../../../store/parent/auth";
import {computed, watch} from "vue";
import BaseInput from "../../base/BaseInput";
import OtpInput from "./otpInput";
import {phonePreparing} from "../../../helpers/phone";
import {sendCode, successLogin as analSuccessLogin, errorLogin} from "../../../utlis/analitics";

const nuxtApp = useNuxtApp()

const emit = defineEmits(["update:open", "final"])
const props = defineProps({
  open: Boolean,
  title: {
    type: String,
    default: null
  },
  smsButtonTitle: {
    type: String,
    default: null
  },
  enterButtonTitle: {
    type: String,
    default: null
  },
})

watch(() => props.open, (val) => {
  // Очищаю данные после закрытия
  if (!val) onClose();
})

const onClose = () => {
  setTimeout(() => resetData(), 300);
  emit("final", authStore.isAuth);
}

// Сбросить все данные
const resetData = () => {
  otp.value = null;
  phone.value = null;
  error.value = null;
  step.value = 1;
}

// На успешный логин
const successLogin = () => {
  emit("update:open", false);
}

const authStore = useAuthStore();

const isLoading = ref(false);

const error = ref(null);

// Телефон пользователя
const phone = ref(null);
const phoneValid = computed(() => !!phone.value)
const sendSmsHandle = async () => {
  sendCode();

  isLoading.value = true;
  const isSuccess = await authStore.sendOtp(phonePreparing(phone.value));
  isLoading.value = false;

  if (isSuccess) step.value = 2;
}

// Одноразовый пароль
const otp = ref(null);
const otpValid = computed(() => otp.value?.length === 4)
const submitOtp = async () => {
  isLoading.value = true;
  const isSuccess = await authStore.login(phonePreparing(phone.value), otp.value);
  isLoading.value = false;

  if (isSuccess) {
    analSuccessLogin()
    successLogin();
  }
  else {
    errorLogin()
    otp.value = "";
    error.value = nuxtApp.$t('wrong_code');
  }
}

const step = ref(1);

const enterButtonTitle = computed(() => {
  if (props.enterButtonTitle) return props.enterButtonTitle;
  return nuxtApp.$t("enter");
})

const title = computed(() => {
  if (props.title) return props.title;
  if (step.value === 1) return nuxtApp.$t('enter_phone');
  if (step.value === 2) return nuxtApp.$t('enter_sms_code');
  return null;
})

</script>

<style lang="scss" scoped>
.auth {

  &__content {
    padding: 0 $side-space-mobile;
  }

  &__submit {
    margin-top: 24px;
  }

  &__hint {
    color: $color--gray-dark;
    font-size: $fs--mini;
  }

  &__error {
    color: $color--red;
    font-size: $fs--mini;
  }

}
</style>