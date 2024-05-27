import api from "~/composables/api";
import cookie from "~/composables/cookie";
import {defineStore} from "pinia";
import {phoneValidation} from "~/helpers/phone";

const state = () => ({
    activeRegistrations: null,

    detailsRegistration: null,
})

const getters = {
    getActiveRegistrations: state => state.activeRegistrations || [],
    getDetailsRegistration: state => state.detailsRegistration || {},
}

const actions = {
    /** Запросить список записей */
    async fetchActiveRegistrations() {
        const { err, body } = await api.get("/parent/register/trial/activelist")
        if (!err) this.activeRegistrations = body;
    },
    /** Запросить пробный записей */
    async fetchDetailsRegistration(id) {
        if (Array.isArray(this.activeRegistrations)) {
            const detailsFromList = this.activeRegistrations.find(r => +r.id === +id);
            if (detailsFromList) return this.detailsRegistration = detailsFromList;
        }
        const { err, body } = await api.get(`/parent/register/trial/${id}`)
        if (!err) this.detailsRegistration = body;
    },

    /**
    * Записаться на пробный урок
     * @param trialProperties
     * @param {Date} trialProperties.date
     * @param {Number} trialProperties.child_id
     * @param {Number} trialProperties.institution_group_id
     * @param {String} trialProperties.weekday
     * @param {String} trialProperties.time
     * @return {Promise<Boolean>} - Успешно ли записался
    * */
    async registrationOnTrial(trialProperties) {
        const { err } = await api.post("/parent/register/trial", trialProperties)
        return !err;
    },

    /**
     * Запрос на звонок от центра
     * */
    async callRequest(institutionId) {
        const { err } = await api.get(`/parent/callRequest/${institutionId}`);
        return !err;
    }
}

export const useParentRegistration = defineStore("parentRegistration", {
    state,
    getters,
    actions,
})