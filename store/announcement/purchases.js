import {defineStore} from "pinia";
import {useAuthStore} from "~/store/parent/auth";
import api from "~/composables/api";


const state = () => ({
    list: [],
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Получить игрущки из корзины
    async fetchList() {
        if (process.server) return;
        const { body, err } = await api.get("/announcement/purchases");
        if (!err) this.list = body;
    },
}

export const usePurchasesStore = defineStore("purchases", {
    state, getters, actions
})