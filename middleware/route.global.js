import {defineNuxtRouteMiddleware} from "nuxt/app";
import {turnOnPageScroll} from "~/utlis/pageScroll";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== from.path && process.client) {
        turnOnPageScroll()
    }
})