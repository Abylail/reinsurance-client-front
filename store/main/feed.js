import {defineStore} from "pinia";
import api from "~/composables/api";

const pageCount = 10;

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
    async fetchListInit() {
        if (this.list) return;
        const { body, err } = await api.get("/announcement/list", {params: {limit: pageCount, offset: 0, status: "active"}});
        this.list = body;
    },

    // Запрос дополнительный инфы
    async fetchListMore(page) {
        if (!this.haveMore || page <= this.page) return;
        this.page = page;
        const { body, err } = await api.get("/announcement/list", {params: {limit: pageCount, offset: (page * pageCount)+1, status: "active"}});
        this.list = [...this.list, ...body];
        if (body.length < pageCount) this.haveMore = false;
    },
}

export const useFeedStore = defineStore("feed", {
    state,
    getters,
    actions,
})