<template>
  <div :class="[{'search-list--mobile': !$device.isDesktop}, {'search-list--desktop': $device.isDesktop}]">
    <h1 class="title container" v-if="props.title">{{ props.title }}</h1>

    <base-scroll-pagination @paginate="loadMoreHandle()">
      <!-- Уроки -->
      <div class="result" v-if="type === 'lessons'">
        <subject-card
          class="result-item"
          v-for="lesson in props.list" :key="lesson.id"
          :info="lesson"
          full
        />
      </div>

      <!-- Центры -->
      <div class="result" v-else-if="type === 'centers'">
        <center-card
          class="result-item"
          v-for="center in props.list" :key="center.id"
          :info="center"
          full
        />
      </div>
    </base-scroll-pagination>

    <base-loader center-horizontal v-if="props.loading"/>
  </div>
</template>

<script setup>
import SubjectCard from "../miniCards/subjectCard";
import BaseButton from "../../base/BaseButton";
import {computed} from "vue";
import BaseLoader from "../../base/BaseLoader";
import CenterCard from "../miniCards/centerCard";
import BaseScrollPagination from "../../base/BaseScrollPagination";

const emits = defineEmits(["paginate"]);
const props = defineProps({
  title: String,
  list: Array,
  type: {
    type: String,
    default: "lessons",
    validator: t => ["lessons", "centers"].includes(t)
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Boolean,
    default: true
  }
})

const { $device } = useNuxtApp();

const haveData = computed(() => !!props.list?.length)

// Загрузить еще
const page = ref(1);
const loadMoreHandle = () => {
  if (!(props.pagination && haveData && !props.loading)) return;
  emits("paginate", ++page.value);
}
</script>

<style lang="scss" scoped>
.search-list--mobile {
  margin-top: 16px;

  .title {
    display: table-cell;
    vertical-align: bottom;
    font-size: $fs--default;
    line-height: $fs--default;
    font-weight: normal;
    height: 24px;
    padding: 0 $side-space-mobile;
    margin-bottom: 8px;
  }

  .result {
    margin-top: 8px;
  }

  .result-item {
    margin-bottom: 16px;
  }

  .more {
    text-align: center;
    * {font-weight: bold !important;}
  }

}
.search-list--desktop {
  margin-top: 16px;

  .title {
    display: table-cell;
    vertical-align: bottom;
    font-size: $fs--default;
    line-height: $fs--default;
    font-weight: normal;
    height: 24px;
    padding: 0 $side-space-mobile;
    margin-bottom: 8px;
  }

  .result {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
  }

  .result-item {
    margin-bottom: 16px;
  }

  .more {
    text-align: center;
  }

}
</style>