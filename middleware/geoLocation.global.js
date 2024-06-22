import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    if (authStore.city) return;
    await authStore.initCity();
});
