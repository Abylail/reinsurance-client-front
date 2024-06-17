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

    searchParams: {},
})

const getters = {
    getList: state => state.list || [],
    getHaveMore: state => state.haveMore
}

const actions = {

    // Изначальный запрос
    async fetchListInit(searchParams = {}) {
        if (JSON.stringify(searchParams) === JSON.stringify(this.searchParams)) return;
        this.list = null;
        const { body, err } = await api.get("/announcement/list", {params: {...searchParams, limit: pageCount, offset: 0, status: "active"}});
        this.list = body;
        this.haveMore = true;
        this.page = 0;
        this.searchParams = searchParams;
    },

    // Запрос дополнительный инфы
    async fetchListMore() {
        if (!this.haveMore) return;
        ++this.page;
        const { body, err } = await api.get("/announcement/list", {params: {...this.searchParams, limit: pageCount, offset: (this.page * pageCount)+1, status: "active"}});
        this.list = [...this.list, ...body];
        if (body.length < pageCount) this.haveMore = false;
    },
}

export const useSearchAnnouncementStore = defineStore("searchAnnouncement", {
    state,
    getters,
    actions,
})