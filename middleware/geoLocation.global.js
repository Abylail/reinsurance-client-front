import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

export default defineNuxtRouteMiddleware(async () => {
    if (process.client) return;
    const authStore = useAuthStore();
    if (authStore.city) return;

    const { req } = useNuxtApp().ssrContext?.event.node;
    let ip;
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) ip = forwarded.split(',').pop();
    else {
        ip = req.connection.remoteAddress
            || req.socket.remoteAddress
            || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    }
    ip = "37.151.221.0"

    if (!ip || ip === '::1') ip = '127.0.0.1';

    await authStore.initCity(ip);
});
