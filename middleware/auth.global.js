import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuth) {
        await authStore.loginToken();
    }
})