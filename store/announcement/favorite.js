import {defineStore} from "pinia";
import {useAuthStore} from "~/store/parent/auth";
import api from "~/composables/api";

const basketKey = "toyCart";

const state = () => ({
    list: [],

    //
    lastIds: null,
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Получить игрущки из корзины
    async fetchFavorite() {
        if (process.server) return;
        const authStore = useAuthStore();
        const ids = authStore.getFavoriteIds || [];
        if (this.lastIds === JSON.stringify(ids)) return;
        if (!ids.length) this.list = [];
        const { body, err } = await api.post("/announcement/list", {ids: ids});
        if (!err) {
            this.list = body;
            this.lastIds = JSON.stringify(ids);
        }
    },
}

export const useFavoriteStore = defineStore("favorite", {
    state, getters, actions
})