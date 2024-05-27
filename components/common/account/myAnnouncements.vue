<template>
  <div class="my-announcements">
    <div class="my-announcements__item"
         v-for="item in myAnnouncementStore.getList" :key="item.id"
    >
      <div class="my-announcements__item-info">
        <div>{{ item.title }} - {{ item.price }}</div>
        <div class="my-announcements__item-status" :class="`my-announcements__item-status--${item.status}`">{{ getStatus(item.status) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMyAnnouncementsStore} from "../../../store/parent/myAnnouncements";
import {onMounted, ref} from "vue";

const isLoading = ref(false);
const myAnnouncementStore = useMyAnnouncementsStore();
const fetchList = async () => {
  isLoading.value = true;
  await myAnnouncementStore.fetchAnnouncements();
  isLoading.value = false;
}

const getStatus = status => ({
  "moderation": "На модерации",
  "rejected": "Отказ",
  "active": "Активен",
  "waitingPayment": "Ожидает оплаты",
  "ordered": "Ожидание доставки",
  "archive": "В архиве"
})[status]

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
    &--moderation {color: $color--orange};
    &--rejected {color: $color--red};
    &--active, &--waitingPayment, &--ordered {color: green};
    &--archive {color: $color--gray}
  }

}
</style>