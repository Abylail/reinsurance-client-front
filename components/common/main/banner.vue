<template>
  <div class="banner" :class="[{'banner--mobile': !$device.isDesktop}, {'banner--desktop': $device.isDesktop}]">
    <div class="banner__actions">
      <a
          class="banner-go-prices"
          href="#prices"
      >Купить</a>
      <button
          class="banner-go-catalog"
          @click="goLessons()"
      >Продать</button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
const { $device } = useNuxtApp();

const router = useRouter();
const goLessons = () => {
  router.push("/toys")
}
</script>

<style lang="scss" scoped>
.banner--mobile {
  position: relative;
  background-image: url("/banner.png");
  min-height: 55vw;
  background-size: cover;
  color: white;
  padding: 32px;
  background-position: center;

  .banner__actions {
    display: flex;
    align-items: center;
    gap: 32px;
    justify-content: center;
    position: absolute;
    bottom: 3vw;
    width: calc(100% - 64px);
  }

  .banner-go-prices {
    border: 1px solid #F9705A;
    color: #F9705A;
    font-size: 4vw;
    width: 120px;
    text-align: center;
    font-weight: bold;
    padding: 8px 0;
    border-radius: 10px;
  }

  .banner-go-catalog {
    background-color: #F9705A;
    color: white;
    width: 120px;
    text-align: center;
    font-size: 4vw;
    padding: 10px 0;
    border-radius: 10px;
  }
}
.banner--desktop {
  position: relative;
  background-image: url("/banner.png");
  width: 100%;
  max-width: 700px;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  margin: 32px auto;
  border-radius: 24px;

  .banner__actions {
    display: flex;
    align-items: center;
    gap: 32px;
    justify-content: center;
    position: absolute;
    bottom: 15px;
    width: 100%;
  }

  .banner-go-prices {
    border: 1px solid #F9705A;
    color: #F9705A;
    font-size: $fs--title;
    width: 140px;
    text-align: center;
    font-weight: bold;
    padding: 8px 0;
    border-radius: 10px;
  }

  .banner-go-catalog {
    background-color: #F9705A;
    color: white;
    font-size: $fs--title;
    padding: 10px 0;
    width: 140px;
    border-radius: 10px;
  }
}
</style>