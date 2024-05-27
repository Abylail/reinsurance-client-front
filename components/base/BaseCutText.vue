<template>
  <span class="base-cut-text" v-show="props.text">
    {{ preparedText }}
  </span>
  <span
      class="base-cut-text__show-all"
      v-if="needCut"
      @click.prevent="showAll = true"
  >{{ $t('show_all') }}</span>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: null
  },
  maxSymbols: {
    type: Number,
    default: 100
  }
})

// Показать весь текст ?
const showAll = ref(false);

// Надо ли обрезать
const needCut = computed(() => props.text && (props.text.length > props.maxSymbols) && !showAll.value);

// Рабочий текст
const preparedText = computed(() => {
  if (!needCut.value) return props.text;
  return props.text.substring(0, props.maxSymbols) + "... "
})
</script>

<style lang="scss" scoped>
.base-cut-text {

  &__show-all {
    color: $color--blue;
    white-space: nowrap;
  }

}
</style>