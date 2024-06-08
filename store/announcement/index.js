import {defineStore} from "pinia";
import api from "~/composables/api";
import {useFeedStore} from "~/store/main/feed";

const state = () => ({
    single: null,
})

const getters = {
    getSingle: state => state.single || {},
}

const actions = {
    // Полуить игрушку по id
    async fetchOne(id) {
        const feedStore = useFeedStore();
        if (this.single?.id === id) return
        if (feedStore.getList.length) {
            this.single = feedStore.getList?.find(t => t.id === +id);
            if (this.single) return;
        }

        const { body, err } = await api.get(`/announcement/single/${id}`);
        if (!err) this.single = body;
    },
}

export const useAnnouncementStore = defineStore("announcement", {
    state, getters, actions
})