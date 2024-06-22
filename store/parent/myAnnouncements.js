import api from "~/composables/api";
import {defineStore} from "pinia";

const state = () => ({
    list: null,
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Получить детей
    async fetchAnnouncements() {
        const { err, body } = await api.get("/announcement/my")
        if (!err) this.list = body;
    },

    // Добавить ребенка
    async create(info) {
        const { err, body } = await api.post("/announcement/create", info);
        return !err;
    },
}

export const useMyAnnouncementsStore = defineStore("myAnnouncements", {
    state,
    getters,
    actions,
})