import {useRuntimeConfig, useRequestHeaders} from "nuxt/app";
import {useAuthStore} from "~/store/parent/auth";

// Обработка ошибок
const apiErrorCatcher = error => {
    console.log("API ERROR", error)
}

// Создание ссылки
const createPath = (path, config) => ((process.env.NODE_ENV === "production" && process.server) ? "/api-client" : config.public.BACKEND_URL) + path;


// Создание опций
const createOptions = (options = {}, method = "get") => {
    const authStore = useAuthStore();
    return {
        credentials: "include",
        headers: {...useRequestHeaders(["cookie"]), Authorization: authStore.getToken},
        ...options,
        method,
    }
}

// GET
const get = async (path, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options);
    $fetch(apiPath, apiOptions)
        .then(response => {
            resolve({body: response?.body, response});
        })
        .catch(response => {
            resolve({err: response?.data?.message});
        })
});

// POST
const post = async (path, body = {}, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options, "post");
    $fetch(apiPath, {...apiOptions, body})
        .then(response => {
            resolve({body: response?.body, response});
        })
        .catch(response => {
            const error = response?.data?.message || "Ошибка";
            apiErrorCatcher(error);
            resolve({err: error});
        })
});

// PUT
const put = async (path, body = {}, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options, "put");
    $fetch(apiPath, {...apiOptions, body})
        .then(response => {
            resolve({body: response?.body, response});
        })
        .catch(response => {
            const error = response?.data?.message;
            apiErrorCatcher(error);
            resolve({err: error});
        })
});

// DELETE
const deleteApi = async (path, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options, "delete");
    $fetch(apiPath, apiOptions)
        .then(response => {
            resolve({body: response?.body, response});
        })
        .catch(response => {
            resolve({err: response?.data?.message});
        })
});

const api = get
api.get = get
api.post = post
api.put = put
api.delete = deleteApi

export default api;