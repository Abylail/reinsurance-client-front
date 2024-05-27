<template>
  <base-go-button
      :title="`${personalData.last_name} ${personalData.first_name}`"
      :sub-title="personalData.phone"
      icon="mdi-account-box"
      @click="openEditorHandle()"
  />

  <base-backdrop v-model:active="openEditor" title="Личные данные">
    <div class="personal-data__editor">
      <base-input title="Фамилия" v-model="editorPersonalData.last_name" type="naked-gray"/>
      <base-input title="Имя" v-model="editorPersonalData.first_name" type="naked-gray"/>
      <base-input class="disabled" title="Номер" v-model="editorPersonalData.phone" phone type="naked-gray"/>
      <div class="personal-data__editor-actions">
        <base-button type="outline" full-width @click="cancelHandle()">Отмена</base-button>
        <base-button :loading="isLoading" full-width @click="saveHandle()">Сохранить</base-button>
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseButton from "../../base/BaseButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseInput from "../../base/BaseInput";
import BaseGoButton from "../../base/BaseGoButton";
import {useAuthStore} from "../../../store/parent/auth";

const authStore = useAuthStore();
const personalData = computed(() => authStore.getClientData);

const editorPersonalData = ref({});

const openEditor = ref(false);
const openEditorHandle = () => {
  editorPersonalData.value = JSON.parse(JSON.stringify(personalData.value));
  openEditor.value = true;
}

const isLoading = ref(false);

const cancelHandle = () => {
  openEditor.value = false;
}
const saveHandle = async () => {
  isLoading.value = true;
  await authStore.updateParentInfo(editorPersonalData.value);
  openEditor.value = false;
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.personal-data {

  &__editor {
    padding: 10px $side-space-mobile;
  }

  &__item {
    padding: 8px 0;
  }

  &__editor-actions {
    margin-top: 100px;
    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>