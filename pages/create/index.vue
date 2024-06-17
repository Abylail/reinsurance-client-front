<template>
  <mobile-header title="Создание объявления"/>

  <div class="create">

    <div class="create__form">

      <div class="create__subtitle">Добавьте фото товара</div>
      <base-photo-input
          v-model="form.photoBuffers"
          multiple
      />

      <div class="create__subtitle">Информация о товаре</div>

      <base-input
          title="Название товара"
          v-model="form.title"
      />

      <base-textarea
          title="Опишите товар"
          v-model="form.description"
      />

      <div class="create__subtitle">Выберите категории товара</div>
            <categories-select v-model="form.categories" :options="categoryStore.getList"/>

      <div class="create__subtitle">Для какого возраста этот товар</div>
      <base-select
          title="Минимальный возраст"
          :options="minAges"
          v-model="form.min_age"
      />

      <base-select
          title="Максимальный возраст"
          :options="maxAges"
          v-model="form.max_age"
      />

      <div class="create__subtitle">Помогите другому родителю</div>

      <base-textarea
          title="Опишите ваш опыт с этим товаром"
          v-model="form.use_experience"
      />

      <div class="create__subtitle">Напишите минимальную цену<br>за которую не жалко :)<br/><br/>Оплату вы получите на личную карту</div>

      <base-input
          title="Ваша цена"
          v-model="form.price"
          number
      />

      <div class="create__subtitle">Мы удерживаем 20% от оплаты для доставки</div>

    </div>

    <div class="create__form create__submit">
      <base-button :disabled="!canSubmit || isLoading" :loading="isLoading" full-width @click="submitHandle()">Создать объявление</base-button>
    </div>

  </div>

  <thanks-create-modal v-model:show="isFinished"/>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {computed, nextTick, ref} from "vue";
import {useCategoriesStore} from "../../store/categories";
import BaseSelect from "../../components/base/BaseSelect";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";
import BaseTextarea from "../../components/base/BaseTextarea";
import BasePhotoInput from "../../components/base/BasePhotoInput";
import {useMyAnnouncementsStore} from "../../store/parent/myAnnouncements";
import {useRouter} from "nuxt/app";
import ThanksCreateModal from "../../components/common/create/thanksCreateModal";
import CategoriesSelect from "../../components/common/create/categoriesSelect";
const { $a } = useNuxtApp();

definePageMeta({
  middleware: "auth"
})

const router = useRouter();

const form = ref({});
const isLoading = ref(false);
const isFinished = ref(false);

const clear = () => form.value = {};

const myAnnouncements = useMyAnnouncementsStore();
const categoryStore = useCategoriesStore();
await categoryStore.fetchList();

const canSubmit = computed(() => form.value.categories?.length && form.value.title && form.value.description && form.value.use_experience && form.value.price && form.value.photoBuffers?.length);

const submitHandle = async () => {
  if (!canSubmit.value) return;
  isLoading.value = true;
  const isSuccess = await myAnnouncements.create(form.value);
  if (isSuccess) {
    $a.create();
    isFinished.value = true;
    nextTick(() => clear());
  }
  else {
    alert("Ошибка при отправке, попробуйте позже")
  }
  isLoading.value = true;
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
</script>

<style lang="scss" scoped>
.create {

  &__form {
    padding: 0 $side-space-mobile;
    width: calc(100% - #{2*$side-space-mobile});
    max-width: 500px;
    margin: 0 auto;
  }

  &__submit {
    margin-top: 32px;
  }

  &__subtitle {
    font-size: $fs--mini;
    text-align: center;
    margin-top: 24px;
    color: $color--gray-dark;
  }

}
</style>