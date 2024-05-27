<template>
  <div :class="[{'base-backdrop--mobile': !$device.isDesktop}, {'base-backdrop--desktop': $device.isDesktop}, {active: props.active}]" v-show="loaded" @click.self.stop="closeSelf">
    <div class="window" :class="{active: props.active}" :ref="el => {dragWrapper = el}" :style="dragStyle" @touchmove="dragging" @touchstart="startDrag" @touchend="stopDrag">
      <button class="holder" @touchstart.stop="startDrag($event, true)"/>
      <div class="title" v-if="title">{{ title }}</div>
      <div class="content" :class="{'content--block-scroll': isDragging}" :ref="el => {contentElement = el}" @touchmove.stop="dragging($event, true)"><slot/></div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, nextTick, onMounted} from "vue";
import {turnOffPageScroll, turnOnPageScroll} from "../../utlis/pageScroll";
const emit = defineEmits(["update:active", "onClose", "onOpen"])
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  }
})

const { $device } = useNuxtApp();

const isDragging = ref(false);
const startYPosition = ref(null);
const activeYPosition = ref(null);
const prevActiveYPosition = ref(null);
const differenceY = ref(0);
const dragBlocked = ref(false);
const dragWrapper = ref(null);
const contentElement = ref(null);

const dragStyle = computed(() => !isDragging.value ? {} :  {
  transition: "0s",
  transform: `translateY(${activeYPosition.value - startYPosition.value}px)`
})


const loaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 300)
})

watch(() => props.active, (newVal) => {
  if (newVal) onOpen();
  else onClose();
})

const onOpen = () => {
  // Контроль скрола
  turnOffPageScroll();
  // Контроль скрола контента
  contentElement.value.scrollTop = 0;
  emit("onOpen")
}

const onClose = () => {
  // Контроль скрола
  turnOnPageScroll();
  emit("onClose")
}

// Закрыть сеюя
const closeSelf = () => {
  emit("update:active", false);
}

const dragging = (event, isContent = false) => nextTick(() => {
  if (dragBlocked.value) return;

  // Мышка идет вверх?
  const isGoesTop = (event.changedTouches[0].clientY - differenceY.value) < startYPosition.value;

  // Отлавливаю скрол по контенту
  if (!isDragging.value && isContent && isGoesTop || (isContent && contentElement.value.scrollTop !== 0)) {
    dragBlocked.value = true;
    return;
  }

  isDragging.value = true;
  let touch = event.changedTouches[0];
  const userY = touch.clientY - differenceY.value;
  // Блочу если уходит вверх
  if (isGoesTop) {
    activeYPosition.value = startYPosition.value;
    return;
  }
  prevActiveYPosition.value = activeYPosition.value;
  activeYPosition.value = userY;
})

const startDrag = event =>  {
  let touch = event.touches[0];
  const elementYPosition = dragWrapper.value.getBoundingClientRect()?.y || touch.clientY;
  startYPosition.value = elementYPosition;
  activeYPosition.value = elementYPosition;
  differenceY.value = touch.clientY - elementYPosition;
  prevActiveYPosition.value = null;
}

const stopDrag = () => {
  clearDragState();
  if (prevActiveYPosition.value && prevActiveYPosition.value < activeYPosition.value) {
    closeSelf();
  }
}

const clearDragState = () => {
  isDragging.value = false;
  differenceY.value = 0;
  startYPosition.value = null;
  dragBlocked.value = false;
}
</script>

<style lang="scss" scoped>
.base-backdrop--mobile {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(26,26,26,.4);
  transition-property: visibility, opacity;
  transition-duration: 0s, 0.4s;
  transition-delay: 0.5s, 0s;

  &.active {
    opacity: 1;
    visibility: visible;
    transition-property: visibility;
    transition-delay: 0s;
  }

  .title {
    font-size: $fs--title;
    font-weight: bold;
    padding: 10px $side-space-mobile;
    white-space: nowrap;
    line-height: $fs--title;
    max-height: $fs--title;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .window {
    height: auto;
    background: white;
    position: fixed;
    z-index: 11;
    opacity: 1;
    left: 0;
    transform: translateY(100%);
    right: 0;
    bottom: 0;
    transition: transform 200ms;
    border-radius: 16px 16px 0 0;

    &.active {
      transform: translateY(0);
      transition-delay: 0.15s;
    }
  }

  .holder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 100%;
    outline: none;
    &:after {
      display: inline-block;
      content: "";
      height: 5px;
      width: 100px;
      background: $color--gray;
      border-radius: 10px;
    }
  }

  .content {
    max-height: calc(70vh - 50px);
    overflow: auto;
    position: sticky;
    top: 0;
    padding-bottom: 20px;

    &--block-scroll {
      pointer-events: none;
    }
  }

}

.base-backdrop--desktop {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(26,26,26,.4);
  transition-property: visibility, opacity;
  transition-duration: 0s, 0.4s;
  transition-delay: 0.5s, 0s;

  &.active {
    opacity: 1;
    visibility: visible;
    transition-property: visibility;
    transition-delay: 0s;
    transition: 200ms;
  }

  .title {
    font-size: $fs--title;
    font-weight: bold;
    padding: 10px $side-space-mobile;
  }

  .window {
    height: auto;
    background: white;
    max-width: 500px;
    width: calc(100% - 50px);
    position: fixed;
    z-index: 11;
    opacity: 1;
    top: 50%;
    transition: 200ms;
    border-radius: 16px;
    overflow: hidden;

    left: 50%;
    transform: translate(-50%, -50%);

    &.active {
      transform: translate(-50%, -50%);
    }
  }

  .holder {
    display: none;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 100%;
    outline: none;
    &:after {
      display: inline-block;
      content: "";
      height: 5px;
      width: 100px;
      background: $color--gray;
      border-radius: 10px;
    }
  }

  .content {
    max-height: 75vh;
    overflow: auto;
    position: sticky;
    top: 0;
    padding-bottom: 20px;

    &--block-scroll {
      pointer-events: none;
    }
  }

}
</style>
