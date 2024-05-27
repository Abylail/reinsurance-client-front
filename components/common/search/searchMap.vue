<template>
  <div class="search-map" id="search-map"/>
  <base-backdrop :title="currentTitle" :active="!!currentBranch" @update:active="setActiveInfo($event)">
    <div v-if="!!currentBranch?.institution">
      <branch-lessons-info v-if="props.type === 'lessons'" :branch="currentBranch" :subject-id="props.subjectId"/>
      <center-card v-else :info="currentInstitution" full/>
    </div>
  </base-backdrop>
  <button class="search-map__user-location" @click="getUserLocation()">
    <base-icon size="24" color="white" name="mdi-navigation-variant-outline"/>
  </button>
</template>

<script setup>
import {computed, onMounted, watch} from "vue";
import {AlmatyCenterCoords} from "../../../config/map";
import {mapPoint} from "../../../utlis/analitics";
import BaseBackdrop from "../../base/BaseBackdrop";
import BranchLessonsInfo from "./branchLessonsInfo";
import CenterCard from "../miniCards/centerCard";
import {useAuthStore} from "../../../store/parent/auth";
import BaseIcon from "../../base/BaseIcon";


const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  subjectId: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "lessons",
    validator: t => ["lessons", "centers"].includes(t)
  },
})

const authStore = useAuthStore();

// Выбранный филиал
const currentBranch = ref(null);
const setActiveInfo = (val) => {
  if (!val) currentBranch.value = null;
}

// Выбранный центр
const currentInstitution = computed(() => ({...currentBranch.value?.institution, institutionBranches: [currentBranch.value]}))

// Тайтл
const currentTitle = computed(() => {
  if (props.type === "lessons") return currentBranch.value?.institution?.name
  else if (props.type === "centers") return currentBranch.value?.address || currentBranch.value?.institution?.name
})

const MarkerOptions = {preset: 'islands#circleIcon', iconColor: '#004BFF'};
const UserLocationOptions = {preset: 'islands#circleIcon', iconColor: '#df3030'};


// Ожидает загрузки скрипта
const scriptLoader = (count = 0, maxCount = 10) => new Promise(resolve => {
  if (window.ymaps || count > maxCount) {
    ymaps.ready(resolve)
  }
  else setTimeout(async () => {
    await scriptLoader(count+1, maxCount);
    resolve()
  }, 100)
})

let Map = null;
const mapInit = async () => {
  if (!window.ymaps) {
    useHead({script: ['/yandex.js']})
  }

  await scriptLoader();

  Map = new window.ymaps.Map("search-map", {
    center: AlmatyCenterCoords,
    zoom: 12,
    markers: [],
    controls: ["zoomControl"],
  });

  initBranches()

  return Map;
}

const initBranches = () => {
  if (!Map || !props.list.length) return;
  Map.geoObjects.removeAll();
  props.list.forEach(branch => {
    if (Array.isArray(branch.coordinates)) {
      Map.geoObjects.add(new ymaps.Placemark([...branch.coordinates], {
        branch_id: branch.id
      }, MarkerOptions))
    }
  })
  Map.geoObjects.events.add('click', branchClick)
  if (authStore.getClientCoords) Map.geoObjects.add(new ymaps.Placemark([...authStore.getClientCoords], {}, UserLocationOptions))

}

const branchClick = event => {
  event.stopPropagation();
  mapPoint();
  const target = event.get('target');
  const branchId = target?.properties?.get("branch_id");
  if (!branchId) return;
  currentBranch.value = props.list.find(b => b.id === branchId);
}

const getUserLocation = () => {
  if (!authStore.getClientCoords) {
    navigator.geolocation.getCurrentPosition(info => {
      const clientCoords = [info?.coords.latitude, info?.coords.longitude];
      Map.geoObjects.add(new ymaps.Placemark([...clientCoords], {}, UserLocationOptions))
      Map?.setCenter(clientCoords)
      authStore.setUserCoords(clientCoords);
    }, (e) => {
      console.log(e)
    }, {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true})
  }
  else {
    Map?.setCenter(authStore.getClientCoords);
  }
}

watch(() => props.list, () => {
  initBranches()
})

onMounted(() => {
  mapInit()
})
</script>

<style lang="scss" scoped>
.search-map {
  //height: 400px;
  position: fixed;
  top: 62px;
  bottom: 0;
  left: 0;
  right: 0;

  &__user-location {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: $side-space-mobile;
    top: calc(165px + #{$side-space-mobile});
    height: 35px;
    width: 35px;
    background: rgba(0, 0, 0, .4);
    border-radius: 5px;
  }
}
</style>