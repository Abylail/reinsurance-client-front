import {defineNuxtPlugin} from "#app";
import { createI18n } from "vue-i18n";
import ru from "@/assets/localization/ru.json"
import kz from "@/assets/localization/kz.json"
import cookie from "~/composables/cookie";
import {watch} from "vue";


export default defineNuxtPlugin(nuxtApp => {
    const i18n = createI18n({
        locale: cookie.lang.get() || "ru",
        fallbackLocale: "ru",
        messages: {ru, kz},
        detectBrowserLanguage: {
            alwaysRedirect: true,
            fallbackLocale: 'ru'
        },
    })

    nuxtApp.vueApp.use(i18n);

    watch(() => i18n.global.locale, lang => {
        cookie.lang.set(lang);
    })

    nuxtApp.provide("i18n", i18n.global);
    nuxtApp.provide("t", i18n.global.t);
    nuxtApp.provide("getProp", (obj, nameSpace) => (obj[`${nameSpace}_${i18n.global.locale}`] || obj[`${nameSpace}_ru}`] || obj[nameSpace]))
})