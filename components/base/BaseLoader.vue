<template>
  <div class="base-loader" :class="{'base-loader--center-horizontal': props.centerHorizontal}">
    <div class="base-loader__item"/>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "basketball",
    validator: t => ["basketball"].includes(t)
  },
  size: {
    type: [Number, String],
    default: 50
  },
  centerHorizontal: {
    type: Boolean,
    default: false
  }
})

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
  margin: 'auto',
  display: 'inline-block'
}))
</script>

<style lang="scss" scoped>
.base-loader {
  display: inline-block;

  &--center-horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item  {
    animation: rotate 1s infinite;
    height: 50px;
    width: 50px;
    margin: .75rem auto;
  }

  &__item:before,
  &__item:after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
  &__item:before {
    animation: ball1 1s infinite;
    background-color: #cb2025;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
  &__item:after {
    animation: ball2 1s infinite;
    background-color: #00a096;
    box-shadow: 30px 0 0 #97bf0d;
  }

}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(0.8);
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(0.8);
    -moz-transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #97bf0d;
  }
  50% {
    box-shadow: 0 0 0 #97bf0d;
    margin-top: -20px;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #97bf0d;
    margin-top: 0;
  }
}
</style>