<template>
  <div class="layout">
    <desktop-header v-if="$device.isDesktop"/>
    <mobile-header v-else/>
    <slot/>
    <main-footer/>
  </div>
</template>

<script setup>
import MobileHeader from "../components/common/layout/mobileHeader";
import DesktopHeader from "../components/common/layout/desktopHeader";
import MainFooter from "../components/common/layout/mainFooter";

const { $device } = useNuxtApp();

useSeoMeta({
  title: "",
  ogTitle: "",
  description: "",
  ogDescription: "",
})
</script>

<style lang="scss" scoped>
.layout {
  padding-top: 80px;
}
</style>