<template>
  <mobile-header title="Ваше объявления"/>
  <div></div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {onMounted} from "vue";
import {useMyAnnouncementsStore} from "../../store/parent/myAnnouncements";

definePageMeta({
  middleware: "auth"
})

const announcementStore = useMyAnnouncementsStore();
onMounted(async () => {
  const draft = await announcementStore.getDraft();
  if (draft) navigateTo(`/create/announcement-${draft.id}`, {redirectCode: 302});
})
// navigateTo(`/create`, {redirectCode: 302});
</script>

<style scoped>

</style>