<template>
  <div class="lessons-info" v-if="!isLoading">
    <subject-card
        class="lessons-info__subject"
        v-for="subject in subjects" :key="subject.id"
        :info="subject"
        full
    />
  </div>

  <div v-else>
    <div class="lessons-info__loading skeleton-loading"/>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useCenterDetailsStore} from "../../../store/details/center";
import SubjectCard from "../miniCards/subjectCard";

const props = defineProps({
  branch: {
    type: Object,
    default: () => ({})
  },
  subjectId: {
    type: Number,
    default: null
  },
})

const institutionId = computed(() => props.branch.institution.id);
const isLoading = ref(true);

const centerStore = useCenterDetailsStore();
const subjects = computed(() => {
  if (!props.subjectId) return centerStore.getSubjects || []
  return centerStore.getSubjects?.filter(s => s.subject_id === props.subjectId) || [];
});

const fetchSubjects = async () => {
  isLoading.value = true;
  await centerStore.fetchCenterSubjects({id: institutionId.value})
  isLoading.value = false;
}

onMounted(() => {
  fetchSubjects();
})
</script>

<style lang="scss" scoped>
.lessons-info {

  &__subject {
    margin-top: 16px;
  }

  &__loading {
    display: block;
    height: 230px;
    padding: 16px 0;
    margin: 16px $side-space-mobile;
  }

}
</style>