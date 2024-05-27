<template>
  <div>

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

onMounted(() => {
  fetchList();
})
</script>

<style scoped>

</style>