import api from "~/composables/api";
import {defineStore} from "pinia";
import {useAuthStore} from "~/store/parent/auth";

const state = () => ({
    list: null,

    draft: null,
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Мои объявления
    async fetchAnnouncements() {
        const { err, body } = await api.get("/announcement/my")
        if (!err) this.list = body;
    },

    async create(info) {
        const authStore = useAuthStore();
        const { err, body } = await api.post("/announcement/create", {...info, city: authStore.getCity});
        return !err;
    },

    // Получить драфт
    async getDraft() {
        if (this.draft) return this.draft;
        const { err, body } = await api.get("/announcement/draft");
        if (err) return null;
        return {
            ...body,
            categories: body.categories?.map(c => c.code) || []
        };
    },

    // Получить драфт
    async getAnnouncement(id) {
        if (this.draft) return this.draft;
        const { err, body } = await api.get(`/announcement/get/${id}`);
        if (err) return null;
        return {
            ...body,
            categories: body.categories?.map(c => c.code) || []
        };
    },

    // Обновление объявления
    async updateDraft(info) {
        const { err, body } = await api.put(`/announcement/update/${info.id}`, {...info, city: authStore.getCity});
        return !err;
    },

    // Опубликовать черновик (на модерацию)
    async publishDraft(id) {
        const { err, body } = await api.put(`/announcement/publish/${id}`);
        if (!err) this.draft = null;
        return !err;
    },

    // Удалить объявление
    async deleteAnnouncement(id) {
        await api.delete(`/announcement/delete/${id}`);
        await this.fetchAnnouncements();
    },

    // Добавить фото
    async addPhoto(id, base64) {
        const info = JSON.stringify({buffer: base64});
        const { err, body } = await api.post(`/announcement/update/${id}/addphoto`, info);
        if (!err) return body.photos || [];
        return null;
    },

    // Удалить фото
    async removePhoto(id, photoPath) {
        const info = JSON.stringify({photoPath});
        const { err, body } = await api.post(`/announcement/update/${id}/removephoto`, info);
        if (!err) return body.photos || [];
        return null;
    }
}

export const useMyAnnouncementsStore = defineStore("myAnnouncements", {
    state,
    getters,
    actions,
})