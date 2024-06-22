import api from "~/composables/api";
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
    async fetchChildren() {
        const { err, body } = await api("/parent/data/children/get")
        if (!err) this.children = toRaw(body);
    },

    // Добавить ребенка
    async addChild(childInfo) {
        const { err, body } = await api.post("/parent/data/children/add", childInfo)
        if (!err) this.children = toRaw(body);
        return !err;
    },

    // Обновить ребенка
    async updateChild(childInfo) {
        const { err, body } = await api.put("/parent/data/children/update", childInfo)
        if (!err) this.children = JSON.parse(JSON.stringify(body));
    },

    // Обновить ребенка
    async deleteChild(childInfo) {
        const { err, body } = await api.delete(`/parent/data/children/delete/${childInfo.id}`)
        if (!err) this.children = JSON.parse(JSON.stringify(body));
    },
}

export const useParentChildrenStore = defineStore("parentChildren", {
    state,
    getters,
    actions,
})