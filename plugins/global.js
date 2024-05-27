import {defineNuxtPlugin} from "#app";

// Метод назад
const goBack = (nuxtApp, extraPath = "/") => {
    if (process.server) return;
    if (window.history.state?.back) nuxtApp.$router.go(-1);
    else nuxtApp.$router.push(extraPath)
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide("goBack", extraPath => goBack(nuxtApp, extraPath));
})