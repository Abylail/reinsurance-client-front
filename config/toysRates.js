import {computed} from "vue";

export const rates = computed((n) => {
    const nuxtApp = useNuxtApp()
    return [
        {
            name_ru: nuxtApp.$t("1_week"),
            price: 15880,
            sale_price: null,
            price_monthly: 15880,
            stars: 0,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
            ],
            minuses: [
                "Замена товара",
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            duration: 0.25,
        },
        {
            name_ru: nuxtApp.$t("1_month"),
            price: 23400,
            sale_price: null,
            price_monthly: 23400,
            stars: 1,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "1 замена"
            ],
            minuses: [
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            duration: 1
        },
        {
            name_ru: nuxtApp.$t("3_month"),
            price: 59997,
            sale_price: null,
            price_monthly: 19999,
            stars: 2,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "3 замены",
                "Скидка на сдедующую подписку 20%",
            ],
            minuses: [
                "Безграничная замена",
            ],
            duration: 3
        },
        {
            name_ru: nuxtApp.$t("6_month"),
            price: 112200,
            sale_price: null,
            price_monthly: 18700,
            stars: 3,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            minuses: [],
            duration: 6
        },
    ]
})