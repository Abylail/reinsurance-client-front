import api from "~/composables/api";
import {defineStore} from "pinia";

const actions = {

    /**
     * Отправить запрос
     * @param request
     * @param {String} request.text
     * @param {String} request.reason
     * @return {Promise<Boolean>} - Успешно ли записался
     * */
    async sendRequest(request) {
        const { err } = await api.post("/parent/request", request)
        return !err;
    },
}

export const useParentRequest = defineStore("parentRequest", {
    actions,
})