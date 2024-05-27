<template>
  <button
      class="base-button"
      :class="[
          `base-button--type-${props.type}`,
          `base-button--size-${props.size}`,
          {'base-button--full-width': props.fullWidth},
          {'base-button--loading': props.loading},
          {'base-button--disabled': props.disabled},
          ]"
      v-bind="$attrs"
  ><slot/></button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
    validator: t => ["default", "outline", "outline-gray", "default-light", "danger-outline", "naked", "naked-blue", "yellow", "orange", "naked-orange"].includes(t),
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "default",
    validator: s => ["mini", "default", "big"]
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
})
</script>

<style lang="scss" scoped>
.base-button {
  border-radius: 10px;
  border: 1px solid transparent;

  &--type-default {
    background-color: $color--blue;
    color: white;
  }

  &--type-default-light {
    background-color: #4973e7;
    color: white;
  }

  &--type-outline-gray {
    border-color: $color--gray-dark;
    color: $color--gray-dark;
  }

  &--type-outline {
    color: $color--blue;
    border-color: $color--blue;
  }

  &--type-danger-outline {
    color: $color--red;
    border-color: $color--red;
  }

  &--type-naked {
    color: $color--blue;
  }

  &--type-naked-blue {
    color: $color--blue;
    background-color: $color--blue-light;
  }

  &--type-yellow {
    color: $color--blue-dark;
    background-color: $color--yellow;
  }

  &--type-orange {
    color: white;
    background-color: $color--orange;
  }

  &--type-naked-orange {
    color: $color--orange;
    background-color: $color--orange-light;
  }

  &--size-mini {
    font-size: $fs--mini;
    padding: 6px 12px;
  }

  &--size-default {
    font-size: $fs--default;
    padding: 12px;
  }

  &--size-big {
    font-size: $fs--title;
    padding: 12px 16px;
  }

  &--full-width {
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    opacity: .5;
  }

  &--loading {
    opacity: .6;
    pointer-events: none;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      margin: 0 auto;
      background-color: rgba(255,255,255,.28);
      box-shadow: 0 0 50px rgba(255,255,255);
      z-index: 1;
      animation: btn-loading-pulse 1.5s ease-in-out infinite;
    }
  }
}

@keyframes btn-loading-pulse {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>