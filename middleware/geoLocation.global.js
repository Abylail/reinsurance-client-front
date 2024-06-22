import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

export default defineNuxtRouteMiddleware(async () => {
    if (process.client) return;
    const authStore = useAuthStore();
    await authStore.initCity();
});
