import api from "~/composables/api";
import {useCookieService} from "~/composables/cookie";
import {defineStore} from "pinia";
import {phoneValidation} from "~/helpers/phone";
import {nextTick} from "vue";

const state = () => ({
    // Информация клиента
    clientData: null,

    // Координаты пользователя
    clientCoords: null,

    // Город пользователя
    city: null,
})

const getters = {
    // Информация клиента
    getClientData: state => state.clientData || {},

    // Айди лайкнутых
    getFavoriteIds: state => state.clientData?.favorite_ids || [],

    // Корзина
    getCartIds: state => state.clientData?.cart || [],

    // Авторизован ли
    isAuth: state => !!state.clientData,

    // Координаты пользователя
    getClientCoords: state => state.clientCoords,

    // Город
    getCity: state => state.city || "almaty",
}

const actions = {

    /**
     * Отправить одноразовый пароль
     * @param {string} phone
     * @return {Promise<boolean>} успешно ли отправлен
     * */
    async sendOtp(phone) {
        if (!phoneValidation(phone)) return false;
        const { err, response } = await api.post("/parent/sendSms", {phone})
        if (response.smsCode) alert(response.smsCode);
        return !err;
    },

    /**
     * Авторизация по паролю
     * @param {string} phone
     * @param {string} password
     * @return {Promise<boolean>} успешно ли отправлен
     * */
    async loginPassword(phone, password) {
        if (!phoneValidation(phone)) return false;
        const { err, body } = await api.post("/parent/login", {phone, password});
        if (err) return false;
        const cookie = useCookieService();
        this.clientData = body;
        await cookie.userToken.set(body.token);
        return !err;
    },

    /**
     * Обычная авторизация (по смс)
     * @param {string} phone
     * @param {string} smsCode
     * @return {Promise<boolean>} - успешно ли отправлен
     * */
    async login(phone, smsCode) {
        if (!phoneValidation(phone) || smsCode?.length !== 4) return false;
        const { err, body } = await api.post("/parent/smsAuth", {phone, sms_code: smsCode})
        if (err) return false;
        const cookie = useCookieService();
        this.clientData = body;
        await cookie.userToken.set(body.token);
        return true;
    },

    // Авторизация по токену
    async loginToken() {
        const cookie = useCookieService();
        if (!cookie.userToken.get()) return
        const { err, body } = await api("/parent/tokenAuth")
        if (!err) this.clientData = body;
        else this.logout();
    },

    // Выход
    logout() {
        const cookie = useCookieService();
        if (process.client) cookie.userToken.remove();
    },

    // Задать пароль
    async setPassword(password) {
        if (!password) return false;
        const { err, body } = await api.post("/parent/setpass", {password});
        return !err;
    },

    // Обновить данные родителя
    async updateParentInfo(parentInfo = {}) {
        const { err, body } = await api.put("/parent/data/update", parentInfo)
        if (!err && body) this.clientData = body;
    },

    // Записать координаты пользователя
    setUserCoords(coords) {
        this.clientCoords = JSON.parse(JSON.stringify(coords));
    },

    async sendSurvey(answer) {
        const { err, body } = await api.post("/toy/survey", {answer})
        if (!err && body) this.clientData = body;
    },

    toggleFavorite(id) {
        let ids = this.getFavoriteIds.slice();

        const idIndex = ids.indexOf(id);
        if (idIndex >= 0) ids.splice(idIndex, 1);
        else ids.push(id);

        this.clientData = {...this.clientData, favorite_ids: ids};
        nextTick(() => api.put("/parent/setFavorite", {favorite_ids: ids}));
    },

    toggleCart(id) {
        let ids = this.getCartIds.slice();

        const idIndex = ids.indexOf(id);
        if (idIndex >= 0) ids.splice(idIndex, 1);
        else ids.push(id);

        this.clientData = {...this.clientData, cart: ids};
        nextTick(() => api.put("/parent/setCart", {cart: ids}));
    },

    setCity(city = this.city) {
        const cookie = useCookieService();
        cookie.city.set(city);
        this.city = city?.toLowerCase() || "almaty";
    },

    async initCity() {
        if (this.city) return;
        const cookieService = useCookieService();
        const cookieCity = cookieService.city.get();
        if (cookieCity) {
            this.city = cookieCity;
            return;
        }

        if (process.server) return;
        await $fetch(`https://flico.kz/api/v1/client/geo`)
            .then(response => {
                if (response.status === "success") {
                    this.city = response.city?.toLowerCase() || "almaty";
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})