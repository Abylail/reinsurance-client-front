<template>
  <base-backdrop :active="props.show">
    <div class="tbm">
      <div class="tbm__image"/>
      <div class="tbm__tools">
        <base-button full-width @click="goMyAnnouncements()">Мои покупки</base-button>
        <base-button type="naked" full-width @click="goMain()">На главную</base-button>
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseButton from "../../base/BaseButton";
import {useRouter} from "nuxt/app";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const router = useRouter();

const goMyAnnouncements = () => router.push("/account");
const goMain = () => router.push("/main");
</script>

<style lang="scss" scoped>
.tbm {

  &__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-image: url("/thanks.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &__tools {
    padding: 0 $side-space-mobile;
  }

}
</style>