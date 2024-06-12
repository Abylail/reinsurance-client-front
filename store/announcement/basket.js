import {defineStore} from "pinia";
import {useAuthStore} from "~/store/parent/auth";
import api from "~/composables/api";

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
    async fetchCart() {
        if (process.server) return;
        const authStore = useAuthStore();
        const ids = authStore.getCartIds || [];
        if (this.lastIds === JSON.stringify(ids)) return;
        if (!ids.length) this.list = [];
        const { body, err } = await api.post("/announcement/list", {ids: ids});
        if (!err) {
            this.list = body;
            this.lastIds = JSON.stringify(ids);
        }
    },

    // Купить
    async buy({ids, needDisinfected}) {
        const { body, err } = await api.post("/announcement/buy", {ids: ids, needDisinfected});
        if (!err) this.list = [];
        return !err;
    },
}

export const useCartStore = defineStore("cart", {
    state, getters, actions
})