<template>
  <mobile-header title="Опрос" go-back="/"/>

  <div class="thanks-survey" v-if="isThanksPage">
    <div class="thanks-survey__block">
      <div class="thanks-survey__title">Спасибо за ваш ответ</div>
      <div class="thanks-survey__sub-title">Благодаря вам мы становимся лучше!</div>

      <div class="thanks-survey__gift">
        <base-icon name="mdi-gift-outline" size="36"/>
        <p>Дарим вам <strong>5 000 тг</strong> для оформления подписки</p>
      </div>
    </div>

    <!-- Тарифы -->
    <prices title="Тарифы со скидкой" :prices="saleRates"/>
  </div>

  <div class="survey" v-else>
    <div class="survey__block">
    <div class="survey__progress-title">{{ activeStep+1 }} из {{ survey.length }}</div>
    <div class="survey__progress-wrapper">
      <div class="survey__progress" :style="{width: `${((activeStep+1)/survey.length)*100}%`}"/>
    </div>

    <div class="survey__go-back" :class="{'survey__go-back--visible': activeStep}" @click="prevQuestion()"><base-icon class="survey__go-back-icon" size="16" name="mdi-arrow-left"/>Предыдущий вопрос</div>

    <div class="survey__question">
      <div class="survey__title" v-html="survey[activeStep]?.title"/>
      <div class="survey__question-hint" v-if="survey[activeStep]?.hint" v-html="survey[activeStep]?.hint"/>
      <base-input class="survey__question-input" v-model="survey[activeStep].answer" title="Ваш ответ" type="naked-grey"/>

      <base-button v-if="(activeStep + 1) < survey.length" type="orange" :disabled="!canGoNext" full-width @click="goNextHandle()">Следующий вопрос</base-button>
      <base-button v-else type="orange" :disabled="!canGoNext" :loading="isLoading" full-width @click="submitSurvey()">Отправить ответ</base-button>
    </div>
    </div>

    <div class="survey__block survey__block--highlight">
      <div class="survey__title">Пожалуйста ответьте честно</div>
      <div>Ваш ответ может помочь <strong>тысячам</strong> других мам!</div>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import BaseInput from "../../../components/base/BaseInput";
import {computed} from "vue";
import BaseButton from "../../../components/base/BaseButton";
import BaseIcon from "../../../components/base/BaseIcon";
import {useRoute, useRouter} from "nuxt/app";
import Prices from "../../../components/common/main/prices";
import {rates} from "../../../config/toysRates";
import {useAuthStore} from "../../../store/parent/auth";

const authStore = useAuthStore();

const activeStep = ref(0);
const survey = ref([
  {
    title: "Сколько у вас детей?",
  },
  {
    title: "Сколько у вас \"коробок\" с игрушками/товарами, которые редко используются?",
  },
  {
    title: "Хотели бы вы продать игрушки/товары которыми не пользуетесь?",
  },
  {
    title: "Купили бы вы игрушки/товары у других мам?",
  },
  {
    title: "Какие товары ваш ребенок уже перерос?",
    hint: "К примеру: кроватку, ходунки, развивающие игрушки"
  },
  {
    title: "Считаете ли вы что товары для развития ребенка надо менять часто?",
    hint: "Напишите почему вы так считаете"
  },
  {
    title: "Если бы была подписка на абсолютно все детские товары и игрушки, без необходимости их покупать. <br/><br/>Сколько вы готовы за нее платить? (тенге в месяц)",
  },
])

const saleRates = computed(() => rates.value.map(rate => ({...rate, sale_price: (rate.price - 5000),})));

// Страница спасибо ?
const route = useRoute();
const isThanksPage = computed(() => !!route.query.submitted)

// Можно ли перейти в след вопрос
const canGoNext = computed(() => !!survey.value[activeStep.value]?.answer);

const isLoading = ref(false);

// След вопрос
const goNextHandle = () => {
  if (!canGoNext.value) return;
  activeStep.value++;
}

// Предыдущий вопрос
const prevQuestion = () => {
  if (!activeStep.value) return;
  activeStep.value--;
}

const router = useRouter();
// Отправить опрос
const submitSurvey = async () => {
  isLoading.value = true;
  await authStore.sendSurvey(survey.value);
  isLoading.value = false;
  await router.replace({query: {submitted: "true"}})
}

definePageMeta({
  middleware: "auth"
})
</script>

<style lang="scss" scoped>
.thanks-survey {

  &__block {
    background-color: white;
    margin: 32px auto;
    max-width: 500px;
    border-radius: 12px;
    width: calc(100% - 48px);
    text-align: center;
    padding-top: 24px;
    overflow: hidden;
    box-shadow: 0px 4px 10px 0px rgba(34, 60, 80, 0.2);
  }

  &__title {
    padding: 0 12px;
    font-size: $fs--title;
    font-weight: bold;
  }

  &__sub-title {
    padding: 0 12px;
    margin-top: 8px;
    color: $color--gray-dark;
  }

  &__gift {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-top: 24px;
    font-size: $fs--title;
    color: white;
    background-color: $color--orange;
    padding: 12px 24px;
  }
}

.survey {

  &__block {
    background-color: white;
    margin: 32px auto;
    max-width: 500px;
    padding: 12px 16px;
    border-radius: 12px;
    width: calc(100% - 56px);
    &--highlight {
      box-shadow: 0px 4px 10px 0px rgba(34, 60, 80, 0.2);
    }
  }

  &__title {
    font-size: $fs--title;
    margin-bottom: 12px;
  }

  &__question-hint {
    font-weight: normal;
    font-size: $fs--mini;
    margin-top: 8px;
  }

  &__question-input {
    margin: 24px 0 36px;
    background-color: $color--gray-light;
    border-radius: 8px;
  }

  &__progress-wrapper {
    height: 6px;
    background-color: $color--gray-light;
    border-radius: 4px;
    margin-bottom: 12px;
    overflow: hidden;
  }

  &__progress-title {
    margin-bottom: 4px;
    color: $color--gray-dark;
  }

  &__progress {
    height: 100%;
    background-color: $color--orange;
    transition: .3s;
  }

  &__go-back-icon {
    margin-right: 8px;
  }

  &__go-back {
    margin-bottom: 24px;
    color: transparent;
    transition: .3s;

    &--visible {
      color: $color--orange;
    }
  }

}
</style>