<template>
  <div class="steps">

    <div class="steps__head">
      <div>
        <button class="steps__go-back" v-if="props.currentStep > 1" @click="emit('back')"><base-icon name="mdi-arrow-left" size="16"/>Назад</button>
      </div>
      <div class="steps__title">{{ stepDescription[props.currentStep] }}</div>
      <div class="steps__step-counter">{{ props.currentStep }} из {{ props.totalSteps }}</div>
    </div>

    <div class="steps__wrapper">
      <div
          class="steps__step"
          :class="{'steps__step--active': step <= props.currentStep}"
          v-for="step in props.totalSteps" :key="step"
      />
    </div>

  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["back"])
const props = defineProps({
  currentStep: {
    type: Number,
    default: 1
  },
  totalSteps: {
    type: Number,
    required: null
  },
})

const stepDescription = {1: "Основная информация", 2: "Цена и опыт", 3: "Возраст", 4: "Категории", 5: "Фото"}
</script>

<style lang="scss" scoped>
.steps {
  padding: 1rem 0 2rem;

  &__wrapper {
    display: flex;
    gap: .25rem;
  }

  &__head {
    display: grid;
    align-items: center;
    grid-template-columns: 65px 1fr 65px;
    padding-bottom: .75rem;
  }

  &__title {
    text-align: center;
    color: $color--blue-dark;
    font-weight: bolder;
  }

  &__step-counter {
    color: $color--gray-dark;
    font-size: $fs--mini;
    text-align: right;
  }

  &__step {
    display: block;
    width: 100%;
    background-color: $color--gray;
    height: 6px;
    border-radius: 10px;

    &--active {
      background-color: $color--orange;
    }
  }

  &__go-back {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $fs--mini;
    color: $color--blue;
  }

}
</style>