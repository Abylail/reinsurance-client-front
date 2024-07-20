<template>
  <div class="auth" v-if="props.open">

    <button class="auth__close" @click="emit('update:open', false)">
      <base-icon name="mdi-close"/>
    </button>

    <!-- ВХОД ПАРОЛЮ -->
    <div class="container--thin" v-if="view === views.login" @keyup.enter="loginPassword()">
      <div class="auth__title">Вход в kidrent</div>

      <div class="auth__form">
        <base-input
            v-model="phone"
            :title="$t('mobile_phone')"
            type="naked-gray"
            prev-icon="mdi-phone-outline"
            phone
        />
        <base-input
            v-model="password"
            :title="$t('password')"
            type="naked-gray"
            prev-icon="mdi-lock-outline"
            password
        />

        <div class="auth__error" v-if="error">{{ error }}</div>
      </div>

      <button class="auth__reset-password" @click="openView(views.resetpass)">Сбросить пароль</button>
      <base-button class="auth__action" type="default-light" full-width @click="loginPassword()">Войти</base-button>
      <base-button class="auth__action" type="naked-blue" full-width @click="openView(views.registration)">У меня нет аккаунта</base-button>

      <nuxt-img class="auth__logo" src="/logo-reverse.svg" alt="logo"/>
    </div>

    <!-- ВХОД НЕ ПАРОЛЬ -->
    <div class="container--thin" v-else-if="!isAuth">
      <div class="auth__title" v-if="view === views.resetpass">Сброс пароля</div>
      <div class="auth__title" v-if="view === views.registration">Регистрация</div>

      <div class="auth__form">
        <base-input
            v-model="phone"
            :title="$t('mobile_phone')"
            :disabled="confirmingOtp"
            type="naked-gray"
            prev-icon="mdi-phone-outline"
            phone
        />

        <otp-input
            v-if="confirmingOtp"
            v-model="otp"
            :error="!!error"
            @submit="submitOtp()"
        />
      </div>

      <base-button
          class="auth__action"
          :class="{disabled: !phoneValid}"
          :loading="isLoading"
          type="default-light"
          full-width
          @click="sendSmsHandle()"
      >{{ $t('send_code') }}</base-button>

      <nuxt-img class="auth__logo" src="/logo-reverse.svg" alt="logo"/>
    </div>

    <!-- Новый пароль -->
    <div class="container--thin" v-else-if="view === views.resetpass">
      <div class="auth__title">Создание пароля</div>

      <div class="auth__form">
        <base-input
          v-model="password"
          :title="$t('password')"
          type="naked-gray"
          prev-icon="mdi-lock-outline"
          password
        />

        <base-input
          v-model="repassword"
          :title="$t('repassword')"
          type="naked-gray"
          prev-icon="mdi-lock-outline"
          password
        />
      </div>

      <base-button class="auth__action" type="default-light" :disabled="!canSetPass" full-width @click="setPassword()">Сохранить пароль</base-button>
      <nuxt-img class="auth__logo" src="/logo-reverse.svg" alt="logo"/>
    </div>

    <!-- Ввод данных пользователя -->
    <div class="container--thin" v-else-if="view === views.registration">
      <div class="auth__title">Давайте знакомиться 🎉</div>

      <div class="auth__form">
        <base-input title="Фамилия" v-model="userData.last_name" type="naked-gray"/>
        <base-input title="Имя" v-model="userData.first_name" type="naked-gray"/>
      </div>

      <base-button class="auth__action" type="default-light" :disabled="!canSetUserData" full-width @click="setUserData()">Сохранить</base-button>
      <nuxt-img class="auth__logo" src="/logo-reverse.svg" alt="logo"/>
    </div>
<!--    <div class="auth__content" v-if="step === 1">-->
<!--      <base-input-->
<!--          v-model="phone"-->
<!--          :title="$t('mobile_phone')"-->
<!--          type="naked-gray"-->
<!--          placeholder="+7 (000) 000-00-00"-->
<!--          prev-icon="mdi-phone-outline"-->
<!--          phone-->
<!--      />-->
<!--      <base-button-->
<!--          class="auth__submit"-->
<!--          :class="{disabled: !phoneValid}"-->
<!--          :loading="isLoading"-->
<!--          full-width-->
<!--          @click="sendSmsHandle()"-->
<!--      >{{ props.smsButtonTitle || $t('send_code') }}</base-button>-->
<!--    </div>-->

<!--    <div class="auth__content" v-if="step === 2">-->
<!--      <otp-input v-model="otp" :error="!!error" @submit="submitOtp()"/>-->
<!--      <div class="auth__hint">{{ $t('enter_send_code') }}</div>-->
<!--      <div class="auth__error" v-if="error">{{ error }}</div>-->
<!--      <base-button-->
<!--          class="auth__submit"-->
<!--          :class="{disabled: !otpValid}"-->
<!--          :loading="isLoading"-->
<!--          full-width-->
<!--          @click="submitOtp()"-->
<!--      >{{ props.enterButtonTitle || $t('enter') }}</base-button>-->
<!--    </div>-->
  </div>
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
import BaseIcon from "../../base/BaseIcon";
import {useRoute, useRouter} from "nuxt/app";
const {$a} = useNuxtApp();

const router = useRouter();
const route = useRoute();
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

// Данные пользователя
const phone = ref(null);
const password = ref(null);
const repassword = ref(null);
const otp = ref(null);
const confirmingOtp = ref(null);
const isLoading = ref(false);
const error = ref(null);

const userData = ref({
  last_name: null,
  first_name: null,
});

// Сбросить все данные
const resetData = () => {
  otp.value = null;
  password.value = null;
  repassword.value = null;
  phone.value = null;
  error.value = null;
  isLoading.value = false;
  userData.value = {};
}

const views = Object.freeze({
  "login": "login",
  "registration": "registration",
  "resetpass": "resetpass",
})
const view = computed({
  get: () => route.query.view || views.login,
  set: view => {
    if (!views[view]) return;
    router.replace({query: {...route.query, view}})
  },
})
const openView = newView => {
  resetData();
  view.value = newView;
}

const isAuth = computed(() => authStore.isAuth);

const onClose = () => {
  setTimeout(() => resetData(), 300);
  emit("final", authStore.isAuth);
}

// На успешный логин
const successAuth = () => {
  emit("final", authStore.isAuth);
  emit('update:open', false);
}

const authStore = useAuthStore();

const phoneValid = computed(() => !!phone.value)

const canLoginPassword = computed(() => !!phone.value && !!password.value);
const loginPassword = async () => {
  if (!canLoginPassword.value) return;
  error.value = false;
  isLoading.value = true;
  const isSuccess = await authStore.loginPassword(phonePreparing(phone.value), password.value);
  isLoading.value = false;

  if (isSuccess) successAuth();
  else error.value = "Неверный логин или пароль";
}

const sendSmsHandle = async () => {
  sendCode();
  confirmingOtp.value = true;

  isLoading.value = true;
  const isSuccess = await authStore.sendOtp(phonePreparing(phone.value));
  isLoading.value = false;

  if (isSuccess) step.value = 2;
}

// Одноразовый пароль
const otpValid = computed(() => otp.value?.length === 4)
const submitOtp = async () => {
  isLoading.value = true;
  const isSuccess = await authStore.login(phonePreparing(phone.value), otp.value);
  isLoading.value = false;

  if (isSuccess) {
    $a.auth()
    analSuccessLogin();
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

const canSetPass = computed(() => password.value?.length > 4 && password.value === repassword.value);
const setPassword = async () => {
  if (!canSetPass.value) return;
  isLoading.value = true;
  const successSet = await authStore.setPassword(password.value);
  isLoading.value = false;

  if (successSet) successAuth();
}

const canSetUserData = computed(() => userData.value.last_name && userData.value.first_name);
const setUserData = async () => {
  if (!canSetUserData.value) return false;
  isLoading.value = true;
  await authStore.updateParentInfo(userData.value);
  isLoading.value = false;

  view.value = views.resetpass;
}

watch(() => props.open, (val) => {
  // Очищаю данные после закрытия
  if (!val) onClose();
})
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;

  &__logo {
    display: block;
    height: 5rem;
    width: 5rem;
    margin: 4rem auto;
    border-radius: .5rem;
  }

  &__title {
    font-size: $fs--title;
    font-weight: 500;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    color: $color--gray-dark;
  }

  &__form {
    padding: 2rem 0 0;
  }

  &__reset-password {
    float: right;
    font-size: $fs--default;
    font-weight: 500;
    color: $color--blue;
    line-height: 40px;
    margin: 8px 0;
  }

  &__content {
    padding: 0 $side-space-mobile;
  }

  &__action {
    margin: .25rem 0;
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