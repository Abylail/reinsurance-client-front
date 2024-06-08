<template>
  <mobile-header title="Избранные" go-back="/account"/>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";

definePageMeta({
  middleware: "auth"
})
</script>

<style scoped>

</style>