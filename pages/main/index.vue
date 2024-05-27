<template>
  <mobile-header :lang-switch="false">
    <div class="main-page-mobile-header-title">
      <nuxt-img class="main-page-mini-logo" src="/logo.svg" alt="logo"/>
      <span>Kidrent</span>
    </div>
  </mobile-header>
  <div :class="[{'main-page--mobile': !$device.isDesktop}, {'main-page--desktop': $device.isDesktop}]">

    <div class="main-page-top">
      <banner/>
    </div>

    <categories class="container"/>

    <feed/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import Banner from "../../components/common/main/banner";
import {useRouter} from "nuxt/app";
import Categories from "../../components/common/search/categories";
import {useFeedStore} from "../../store/main/feed";
import Feed from "../../components/common/main/feed";
const { $device } = useNuxtApp();

const router = useRouter();
const goSurvey = () => {
  router.push("/account/survey")
}

definePageMeta({
  key: (route) => route.fullPath,
  keepalive: true
})

</script>

<style lang="scss" scoped>
.main-page-mobile-header-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  font-size: $fs--title;
}
.main-page-mini-logo {
  height: 50px;
}
.main-page--mobile {

  .main-page-mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
  }

  .main-page-search-wrapper {
    padding: $side-space-mobile;
    background-color: white;;
  }

  .main-page-mini-logo {
    height: 50px;
  }

  .main-page-title {
    font-size: $fs--title;
    font-weight: normal;
  }

  .main-page-block {
    margin: 16px 0;
  }

  .main-page-steps {
    margin-top: 16px;
  }

  .main-page-step {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .main-page-step-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: $color--red;
    color: white;
    margin-right: 8px;
  }

}
.main-page--desktop {

  .main-page-top {
    background-color: #c9e3d8;
    border-radius: 1rem;
  }

  .main-page-mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .main-page-search-wrapper {
    padding: $side-space-mobile;
    background-color: white;;
  }

  .main-page-mini-logo {
    height: 50px;
  }

  .main-page-title {
    font-size: $fs--title;
    font-weight: normal;
  }

  .main-page-block {

  }

  .main-page-steps {
    margin-top: 16px;
  }

  .main-page-step {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .main-page-step-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: $color--red;
    color: white;
    margin-right: 8px;
  }

}

.go-survey {
  margin: 16px 0;
  max-width: 700px;
}
</style>