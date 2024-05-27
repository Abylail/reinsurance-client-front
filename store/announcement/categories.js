import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    list: null,
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Получить игрущки
    async fetchList() {
        if (this.list) return;
        const { body, err } = await api.get("/toy/getCategories");
        if (!err) this.list = body;
    },
}

export const useToyCategoriesStore = defineStore("toyCategories", {
    state, getters, actions
})