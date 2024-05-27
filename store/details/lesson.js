import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Основная информация о уроке
    lessonInfo: null,
})

const getters = {
    // Основная информация о уроке
    getLessonInfo: state => state.lessonInfo || {},
}

const actions = {
    // Запросить основную информацию
    async fetchLessonInfo({id}) {
        if (this.lessonInfo?.id === id) return;
        const {body, err} = await api.get(`/institutionSubject/details/${id}`);
        if (!err) this.lessonInfo = body;
    },
}

export const useLessonDetailsStore = defineStore("lessonDetails", {
    state,
    getters,
    actions,
})