import api from "~/composables/api";
import cookie from "~/composables/cookie";
import {defineStore} from "pinia";
import {toRaw} from "vue";

const state = () => ({
    // Дети
    children: null,
})

const getters = {
    // Дети
    getChildren: state => state.children || [],
}

const actions = {
    // Получить детей
    async fetchAnnouncements() {
        const { err, body } = await api.get("/announcement/my")
        if (!err) this.children = toRaw(body);
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