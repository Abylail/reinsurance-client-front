<template>
  <mobile-header title="Ваше объявления"/>

  <div class="announcement-create">
    <steps
        :current-step="step"
        :total-steps="5"
        @back="goStep(step - 1)"
    />

    <!-- Первый шаг -->
    <div v-if="step === 1">
      <base-input
          title="Название товара"
          v-model="announcement.title"
      />

      <base-textarea
          title="Опишите товар"
          v-model="announcement.description"
      />
      <my-city/>
    </div>

    <!-- Второй шаг -->
    <div v-else-if="step === 2">
      <div class="announcement-create__subtitle">Напишите <strong>минимальную</strong> цену<br>за которую не жалко :)<br/>Оплату вы получите на личную карту</div>

      <base-input
          title="Ваша цена"
          v-model="announcement.price"
          number
      />

      <base-textarea
          title="Опишите ваш опыт с этим товаром"
          v-model="announcement.use_experience"
      />
    </div>

    <!-- Третий шаг -->
    <div v-if="step === 3">
      <base-select
          title="Минимальный возраст"
          :options="minAges"
          v-model="announcement.min_age"
      />

      <base-select
          title="Максимальный возраст"
          :options="maxAges"
          v-model="announcement.max_age"
      />
    </div>

    <!-- Четвертый шаг -->
    <div v-if="step === 4">
      <categories-select
          v-model="announcement.categories"
          :options="categoryStore.getList"
      />
    </div>

    <div v-if="step === 5">
      <base-photo-input
          :model-value="announcement.photos"
          multiple
          :loading="isLoading"
          @add="addPhoto($event)"
          @remove="removePhoto($event)"
      />
    </div>


    <div class="announcement-create__action">
      <base-button v-if="step < 5" :disabled="!canGoStep" full-width @click="goStep()">Продолжить</base-button>
      <base-button v-else :disabled="!canGoStep" :loading="isLoading" full-width @click="publishHandle()">Опубликовать</base-button>
    </div>
  </div>

  <thanks-create-modal v-model:show="isFinished"/>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useRoute, useRouter} from "nuxt/app";
import {computed} from "vue";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";
import BaseTextarea from "../../components/base/BaseTextarea";
import {useMyAnnouncementsStore} from "../../store/parent/myAnnouncements";
import MyCity from "../../components/common/main/myCity";
import BaseSelect from "../../components/base/BaseSelect";
import CategoriesSelect from "../../components/common/create/categoriesSelect";
import {useCategoriesStore} from "../../store/categories";
import Steps from "../../components/common/create/steps";
import ThanksCreateModal from "../../components/common/create/thanksCreateModal";
import BasePhotoInput from "../../components/base/BasePhotoInput";

definePageMeta({
  middleware: "auth"
})

const announcement = ref({});
const isLoading = ref(false);
const isFinished = ref(false);

const route = useRoute();
const announcementStore = useMyAnnouncementsStore();
announcement.value = await announcementStore.getAnnouncement(route.params.id);

const categoryStore = useCategoriesStore();
categoryStore.fetchList();

const router = useRouter();
const step = computed({
  get: () => +router.currentRoute.value.query?.step || 1,
  set: (num) => {
    router.replace({query: {...router.currentRoute.value.query, step: num}});
  }
})

const canGoStep = computed(() => {
  if (step.value === 1) return !!announcement.value.title && !!announcement.value.description;
  else if (step.value === 2) return !!announcement.value.price && !!announcement.value.use_experience;
  else if (step.value === 3) return !!announcement.value.min_age && !!announcement.value.max_age;
  else if (step.value === 4) return !!announcement.value.categories?.length;
  else if (step.value === 5) return !!announcement.value.photos?.length;
})

const goStep = (newStep = step.value + 1) => {
  step.value = newStep;
  announcementStore.updateDraft(announcement.value);
}

const publishHandle = async () => {
  isLoading.value = true;
  const success = await announcementStore.publishDraft(announcement.value.id);
  if (!success) alert("Извините, возникли проблемы")
  else isFinished.value = true;
  isLoading.value = false;
}

const maxAges = [
  {name: "до 3 мес", key: 3},
  {name: "до 6 мес", key: 6},
  {name: "до 1 года", key: 12},
  {name: "до 2 лет", key: 24},
  {name: "до 4 лет", key: 48},
  {name: "до 8 лет", key: 96},
]
const minAges = [
  {name: "с рождения", key: "0"},
  {name: "от 3 мес", key: 3},
  {name: "от 6 мес", key: 6},
  {name: "от 1 года", key: 12},
  {name: "от 2 лет", key: 24},
  {name: "от 4 лет", key: 48},
]

const addPhoto = async (photoBase64) => {
  isLoading.value = true;
  const newPhotos = await announcementStore.addPhoto(announcement.value.id, photoBase64);
  if (newPhotos) announcement.value.photos = newPhotos;
  isLoading.value = false;
}
const removePhoto = async (photoPath) => {
  isLoading.value = true;
  const newPhotos = await announcementStore.removePhoto(announcement.value.id, photoPath);
  if (newPhotos) announcement.value.photos = newPhotos;
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.announcement-create {
  padding: 0 $side-space-mobile;
  width: calc(100% - #{2*$side-space-mobile});
  max-width: 500px;
  margin: 0 auto;

  &__action {
    margin-top: 4rem;
  }

  &__subtitle {
    font-size: $fs--mini;
    text-align: center;
    color: $color--gray-dark;
    &:not(:first-child) {
      margin-top: 24px;
    }
  }
}
</style>