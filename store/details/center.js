import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Основная информация о уроке
    centerInfo: null,

    // Предметы центра
    subjectsCenterId: null,
    subjects: null,
})

const getters = {
    // Основная информация о уроке
    getCenterInfo: state => state.centerInfo || null,

    // Предметы центра
    getSubjects: state => state.subjects || [],
}

const actions = {
    // Запросить основную информацию
    async fetchCenterInfo({id}) {
        if (this.centerInfo?.id === id) return;
        const {body, err} = await api.get(`/institution/details/${id}`);
        if (!err) this.centerInfo = body;
    },

    async fetchCenterSubjects({ id }) {
        if (this.subjects && this.subjectsCenterId === id) return;
        const {body, err} = await api.get(`/institution/details/${id}/subjects`);
        if (!err) {
            this.subjectsCenterId = id;
            this.subjects = body;
        }
    },
}

export const useCenterDetailsStore = defineStore("centerDetails", {
    state,
    getters,
    actions,
})