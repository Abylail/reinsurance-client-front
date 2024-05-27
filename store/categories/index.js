import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    // Список Категорий
    list: null,
})

const getters = {
    getList: state => state.list || []
}

const actions = {

    // Изначальный запрос
    async fetchList() {
        if (this.list) return;
        const { body, err } = await api.get("/announcement/categories");
        if (!err) this.list = body;
    },
}

export const useCategoriesStore = defineStore("categories", {
    state,
    getters,
    actions,
})