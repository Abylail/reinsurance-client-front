import mixpanel from "mixpanel-browser";
import {defineNuxtPlugin} from "#app";
import {useRuntimeConfig} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

const createEmpty = () => ({
    auth: () => {},
    toggleCart: () => {},
    toggleFavorite: () => {},
    create: () => {},
})

export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig();
    if (!config.public.MIXPANEL_TOKEN || !process.client) return nuxtApp.provide("a", createEmpty());

    mixpanel.init(config.public.MIXPANEL_TOKEN, {
        track_pageview: "full_url",
    })

    const authStore = useAuthStore();
    if (authStore.isAuth && authStore.getClientData?.id) mixpanel.identify(authStore.getClientData.id);

    nuxtApp.provide("a", {
        auth: () => {
            mixpanel.track("auth");
            mixpanel.identify(authStore.getClientData.id);
            mixpanel.people.set({
                $name: authStore.getClientData.first_name,
                $phone: authStore.getClientData.phone
            })
        },

        toggleCart: () => {
            mixpanel.track("toggleCart");
        },

        toggleFavorite: () => {
            mixpanel.track("toggleFavorite");
        },

        create: () => {
            mixpanel.track("create");
        },
    })
})