<template>
  <div class="feed container">
    <base-scroll-pagination @paginate="fetchMore($event)">
      <div class="feed__list">
        <announcement-card
            class="feed__item"
            v-for="announcement in feed.getList"
            :info="announcement"
        />
      </div>
    </base-scroll-pagination>

    <base-loader v-if="isLoading" center-horizontal/>
  </div>
</template>

<script setup>
import {useFeedStore} from "../../../store/main/feed";
import BaseScrollPagination from "../../base/BaseScrollPagination";
import {ref} from "vue";
import AnnouncementCard from "../miniCards/announcementCard";
import BaseLoader from "../../base/BaseLoader";

const props = defineProps({
  pagination: {
    type: Boolean,
    default: true
  }
})

const feed = useFeedStore();
await feed.fetchListInit();

const isLoading = ref(false);
const fetchMore = async (page) => {
  if (isLoading.value || !props.pagination) return;
  isLoading.value = true;
  await feed.fetchListMore(page);
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.feed {
  margin-top: 1rem;
  margin-bottom: 1rem;

  &__list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  &__item {
    flex: 1;
  }

}
</style>