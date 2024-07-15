<template>
  <div class="pretty-categories container">
      <nuxt-link
          class="pretty-categories__item"
          v-for="(category, index) in categories" :key="index"
          :to="`/announcements/${category.code}`"
      >
        <div class="pretty-categories__item-content">
          <div class="pretty-categories__item-subtitle">{{ category.subTitle }}</div>
          <div class="pretty-categories__item-title">{{ category.title }}</div>
        </div>
        <div class="pretty-categories__item-image" :style="{backgroundImage: `url(/categories/${category.imageName})`}"/>
      </nuxt-link>
  </div>
</template>

<script setup>
const categories = [
  {
    title: "Коляски и аксессуары",
    subTitle: "Коляски, шезлонги, эргорюкзаки, люльки",
    code: "kolyaski_i_aksessuary",
    imageName: "kolyaski_i_aksessuary.png"
  },
  {
    title: "Развлечения",
    subTitle: "Игрушки, подарки и развлечения",
    code: "razvlecheniya",
    imageName: "razvlecheniya.png"
  },
  {
    title: "Мебель",
    subTitle: "Кроватки, шезлонги и стульчики",
    code: "mebel",
    imageName: "mebel.png"
  },
  {
    title: "Эко товары",
    subTitle: "Экологичные товары",
    code: "eco",
    imageName: "eco.png"
  },
  {
    title: "Развитие",
    subTitle: "Товары для развития",
    code: "razvitiye",
    imageName: "razvitiye.png"
  },
]
</script>

<style lang="scss" scoped>
.pretty-categories {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem 0;

  &__item {
    display: flex;
    flex-direction: column;
    background-position: center;
    background-size: contain;
    height: calc(100vw/2 - 2rem);
    max-height: calc(300px - 3rem);
    //min-width: 300px;
    //width: 300px;
    border-radius: .25rem;
    overflow: hidden;
    background-color: #d2e2fb;

    &:first-child {
      grid-column: 1 / -1;
      background-size: cover;
    }
  }

  &__item-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    //background-color: rgba(0,0,0, .4);
    height: 35%;
    //width: 100%;
    color: $color--black;
    font-weight: 600;
    padding: .5rem 1rem 0;
  }

  &__item-title {
    font-size: $fs--sub-title;
  }

  &__item-subtitle {
    font-size: $fs--mini;
    font-weight: 400;
  }

  &__item-image {
    flex: 1;
    background-size: 120%;
    background-position: center;
    background-repeat: no-repeat;
  }

}
</style>