import {defineStore} from "pinia";
import api from "~/composables/api";

const pageCount = 100;

const state = () => ({
    // Список предметов
    list: null,

    // Страница поиска
    page: 0,

    // Есть ли еще ?
    haveMore: true,
})

const getters = {
    getList: state => state.list || [],
    getHaveMore: state => state.haveMore
}

const actions = {

    // Изначальный запрос
    async fetchList() {
        if (this.list) return;
        const { body, err } = await api.get("/subject/get");
        if (!err) this.list = body;
    },
}

export const useSubjectsStore = defineStore("subjects", {
    state,
    getters,
    actions,
})