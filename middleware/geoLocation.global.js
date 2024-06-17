import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";
import cookie from "~/composables/cookie";

export default defineNuxtRouteMiddleware(async () => {
    if (process.client) return;
    const authStore = useAuthStore();
    if (authStore.city) return;

    const savedCity = cookie.city.get();
    if (savedCity) {
        authStore.setCity(savedCity);
        return;
    }

    // const GeoIp = await useGeo();
    //
    // const { req } = useNuxtApp().ssrContext?.event.node;
    // let ip;
    // const forwarded = req.headers['x-forwarded-for'];
    // if (forwarded) ip = forwarded.split(',').pop();
    // else {
    //     ip = req.connection.remoteAddress
    //         || req.socket.remoteAddress
    //         || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    // }
    //
    // // Проверка на наличие локального IPv6 адреса и его замена на IPv4 адрес
    // if (!ip || ip === '::1') {
    //     ip = '127.0.0.1';
    // }
    //
    // const geo = GeoIp.lookup(ip);
    // authStore.setCity(geo?.city?.toLowerCase());
});
