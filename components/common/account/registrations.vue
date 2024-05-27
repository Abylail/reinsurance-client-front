<template>
  <div class="registrations">

    <div class="registrations__item" v-for="(registration, index) in registrations" :key="index" @click="registrationSelect(registration)">
      <div class="registrations__item-info">{{ getRegistrationMainInfo(registration) }}</div>
      <div class="registrations__item-child" v-if="registration.child">
        <base-icon class="registrations__item-icon" name="mdi-human-child" size="18"/>
        <span>{{ registration.child?.name || registration.child_name }}</span>
      </div>
      <div class="registrations__item-address">
        <base-icon class="registrations__item-icon" name="mdi-map-marker-outline" size="18"/>
        <span>{{ getAddress(registration) }}</span>
      </div>
    </div>

    <div class="registrations__empty" v-if="!registrations.length && !isLoading">У вас нет активных записей</div>

  </div>
</template>

<script setup>
import {useParentRegistration} from "../../../store/parent/registration";
import {computed, onMounted} from "vue";
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["select"])

const isLoading = ref(false);
const parentRegistrationStore = useParentRegistration();
const registrations = computed(() => parentRegistrationStore.getActiveRegistrations)
const fetchActiveRegistrations = async () => {
  isLoading.value = true;
  await parentRegistrationStore.fetchActiveRegistrations();
  isLoading.value = false;
}

const isEmpty = computed(() => !isLoading.value && !registrations.value.length)

const getRegistrationDate = (registration) => `${registration.time} ${new Date(registration.date).toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long' })}`
const getRegistrationMainInfo = (registration) => `${registration.institutionGroup?.institutionSubject?.name || ""} (${getRegistrationDate(registration)})`
const getAddress = (registration) => `${registration?.institution?.name}, ${registration.institutionGroup?.institutionBranch?.address || ""}`

const registrationSelect = registration => {
  emit("select", registration);
}

onMounted(() => {
  fetchActiveRegistrations();
})
</script>

<style lang="scss" scoped>
.registrations {

  &__item {
    margin: 12px 0;
    padding: 10px;
    background-color: white;
    border-radius: 14px;
  }

  &__item-info {
    margin-bottom: 12px;
    font-weight: bold;
  }

  &__item-child {
    margin-bottom: 4px;
  }

  &__item-icon {
    color: $color--blue;
    margin-right: 4px;
  }

  &__empty {
    color: $color--gray-dark
  }

}
</style>