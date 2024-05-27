import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    list: null,
    single: null,
})

const getters = {
    getList: state => state.list || [],
    getSingle: state => state.single || {},
}

const actions = {
    // Полуить игрушку по id
    async fetchOne(toyId) {
        if (this.single?.id === toyId) return
        if (this.list) this.single = this.list?.find(t => t.id === toyId);
        if (this.single) return;

        const { body, err } = await api.get(`/toy/get/${toyId}`);
        if (!err) this.single = body;
    },

    // Получить игрущки
    async fetchList({maxAge, minAge, categoryId}) {
        this.list = null;
        const { body, err } = await api.get("/toy/get", {params: {maxAge, minAge, categoryId}});
        if (!err) this.list = body;
    },
}

export const useAnnouncementStore = defineStore("announcement", {
    state, getters, actions
})