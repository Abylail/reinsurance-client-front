<template>
  <card-list>
      <nuxt-link
          class="pretty-categories__item"
          v-for="(category, index) in categories" :key="index"
          :style="{backgroundImage: `url(/categories/${category.imageName})`}"
          :to="`/announcements/${category.code}`"
      >
        <div class="pretty-categories__item-content">
          <div class="pretty-categories__item-title">{{ category.title }}</div>
          <div class="pretty-categories__item-subtitle">{{ category.subTitle }}</div>
        </div>
      </nuxt-link>
  </card-list>
</template>

<script setup>
import CardList from "../cardList";

const categories = [
  {
    title: "Коляски",
    subTitle: "От 15000тг",
    code: "kolyaski_i_aksessuary",
    imageName: "kolyaska.jpeg"
  },
  {
    title: "Развлечения",
    subTitle: "Игрушки, подарки и развлечения",
    code: "razvlecheniya",
    imageName: "razvlecheniya.jpg"
  },
  {
    title: "Мебель",
    subTitle: "Кроватки, шезлонги и стульчики",
    code: "mebel",
    imageName: "mebel.jpg"
  },
  {
    title: "Эко товары",
    subTitle: "Экологичные товары",
    code: "eco",
    imageName: "eco.png"
  },
]
</script>

<style lang="scss" scoped>
.pretty-categories {

  &__item {
    display: block;
    background-position: center;
    background-size: cover;
    height: 140px;
    min-width: 300px;
    width: 300px;
    border-radius: 1rem;
    overflow: hidden;
  }

  &__item-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(0,0,0, .4);
    height: 100%;
    width: 100%;
    color: white;
    font-weight: bolder;
    text-shadow: black 2px 0 16px;
  }

  &__item-title {
    padding: 0 1rem;
    font-size: $fs--sub-title;
  }

  &__item-subtitle {
    padding: 0 1rem .5rem;
    font-size: $fs--mini;
  }

}
</style>