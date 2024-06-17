import {useCookie} from "nuxt/app";

/**
 * Создание куки сервиса
 * @param {string} name
 * @return {Object<get<function>,set<function>,remove<function>>}
 * */
const createCookie = name => {
    return {
        get: () => useCookie(name)?.value,
        set: (val) => useCookie(name).value = val,
        remove: () => useCookie(name).value = null,
    }
}

const cookieService = {
    userToken: createCookie("userToken"),
    lang: createCookie("lang"),
    city: createCookie("city"),
}

export default cookieService