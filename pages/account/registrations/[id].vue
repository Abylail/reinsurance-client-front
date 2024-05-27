<template>
  <mobile-header title="Запись на пробный" go-back="/account"/>

  <base-loader class="registration-details__block" v-if="isLoading" center-horizontal/>

  <div class="registration-details" v-else>

    <div class="container--white">
      <h1 class="title">Запись на урок <span v-if="subjectName">"{{ subjectName }}"</span></h1>
      <div class="registration-details__info">
        <base-icon class="registration-details__info__icon" name="mdi-calendar"/>
        <div class="registration-details__info__title">Дата:</div>
        <div class="registration-details__info__value">{{ dateTrial }}</div>
      </div>
      <div class="registration-details__info">
        <base-icon class="registration-details__info__icon" name="mdi-clock-time-eight-outline"/>
        <div class="registration-details__info__title">Время:</div>
        <div class="registration-details__info__value">{{ weekDayTrial }} {{ timeTrial }}</div>
      </div>
      <div class="registration-details__info">
        <base-icon class="registration-details__info__icon" name="mdi-human-child"/>
        <div class="registration-details__info__title">Записанный ребенок:</div>
        <div class="registration-details__info__value">{{ childName }}</div>
      </div>
    </div>

    <div class="registration-details__block container--white">
      <h3 class="title">Местоположение</h3>
      <div class="registration-details__info">
        <base-icon class="registration-details__info__icon" name="mdi-school-outline"/>
        <div class="registration-details__info__title">Центр:</div>
        <div class="registration-details__info__value">{{ centerName }}</div>
      </div>
      <div class="registration-details__info">
        <base-icon class="registration-details__info__icon" name="mdi-map-marker"/>
        <div class="registration-details__info__title">Адрес:</div>
        <div class="registration-details__info__value">{{ address }}</div>
      </div>
      <base-yandex-mini-map
          v-if="subjectBranch"
          class="registration-details__info"
          :branches="[subjectBranch]"
          height="150px"
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import {useParentRegistration} from "../../../store/parent/registration";
import {computed, onMounted} from "vue";
import {useRoute} from "nuxt/app";
import BaseYandexMiniMap from "../../../components/base/BaseYandexMiniMap";
import BaseLoader from "../../../components/base/BaseLoader";
import BaseIcon from "../../../components/base/BaseIcon";
import {weekdayList} from "../../../config/weekdays";

const isLoading = ref(true);

const route = useRoute();
const trialId = computed(() => route.params.id);

const parentRegistrationStore = useParentRegistration();
const registration = computed(() => parentRegistrationStore.getDetailsRegistration);
const fetchDetailsRegistration = async () => {
  isLoading.value = true;
  await parentRegistrationStore.fetchDetailsRegistration(trialId.value);
  isLoading.value = false;
}

const subjectName = computed(() => registration.value?.institutionGroup?.institutionSubject?.name)
const dateTrial = computed(() => new Date(registration.value?.date)?.toLocaleDateString() || "-");
const weekDayTrial = computed(() => weekdayList.find(w => w.code === registration.value?.weekday)?.name || "-")
const timeTrial = computed(() => registration.value.time || "-")
const childName = computed(() => registration.value?.child?.name || registration.value?.child_name || "-")

const centerName = computed(() => registration.value?.institutionGroup?.institution?.name || "-")
const subjectBranch = computed(() => registration.value?.institutionGroup?.institutionBranch)
const address = computed(() => registration.value?.institutionGroup?.institutionBranch?.address || "-")

onMounted(() => {
  fetchDetailsRegistration();
})
</script>

<style lang="scss" scoped>
.registration-details {

  &__block {
    margin: 16px 0;
  }

  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;

    &__icon {
      color: $color--blue;
      margin-right: 5px;
    }

    &__title {
      margin-right: 5px;
    }

    &__value {
      font-weight: bold;
    }
  }
}
</style>