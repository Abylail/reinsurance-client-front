<template>
  <div class="my-announcements">
    <div class="my-announcements__item"
         v-for="item in myAnnouncementStore.getList" :key="item.id"
    >
      <div class="my-announcements__item-info">
        <div>{{ item.title }} - {{ item.price }} (<span class="my-announcements__item-status" :class="`my-announcements__item-status--${item.status}`">{{ getStatus(item.status) }}</span>)</div>
<!--        <div class="my-announcements__item-status" :class="`my-announcements__item-status&#45;&#45;${item.status}`">{{ getStatus(item.status) }}</div>-->
        <div class="my-announcements__item-actions">
          <button class="my-announcements__item-edit" @click="goEdit(item)">Редактировать</button>
          <button class="my-announcements__item-delete" @click="deleteHandle(item)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMyAnnouncementsStore} from "../../../store/parent/myAnnouncements";
import {onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

const isLoading = ref(false);
const myAnnouncementStore = useMyAnnouncementsStore();
const fetchList = async () => {
  isLoading.value = true;
  await myAnnouncementStore.fetchAnnouncements();
  isLoading.value = false;
}

const getStatus = status => ({
  "draft": "Черновик",
  "moderation": "На модерации",
  "rejected": "Отказ",
  "active": "Активен",
  "waitingPayment": "Ожидает оплаты",
  "ordered": "Ожидание доставки",
  "archive": "В архиве"
})[status]

const router = useRouter();
const goEdit = (announcement) => {
  if (announcement.status !== 'active' || confirm("Вы должны будете занового пройти модерацию")) router.push(`/create/announcement-${announcement.id}`);
}

const deleteHandle = async (announcement) => {
  isLoading.value = true;
  if (confirm("Вы точно хотите удалить объявление?")) await myAnnouncementStore.deleteAnnouncement(announcement.id);
  isLoading.value = false;
}

onMounted(() => {
  fetchList();
})
</script>

<style lang="scss" scoped>
.my-announcements {

  &__item {
    padding: .5rem;
    background-color: white;
    margin-bottom: .5rem;
    border-radius: 5px;
  }

  &__item-status {
    font-weight: 500;
    &--moderation {color: $color--orange};
    &--rejected {color: $color--red};
    &--active, &--waitingPayment, &--ordered {color: green};
    &--archive, &--draft {color: $color--gray}
  }

  &__item-actions {
    margin-top: 8px;
  }

  &__item-edit {
    color: $color--blue;
    font-size: $fs--mini;
    margin-right: 16px;
  }

  &__item-delete {
    color: $color--red;
    font-size: $fs--mini;
  }

}
</style>