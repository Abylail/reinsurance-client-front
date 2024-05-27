import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuth) return navigateTo({
        path: to.path === from.path ? "/main" : from.path,
        query: {
            login: to.path
        }
    })
})