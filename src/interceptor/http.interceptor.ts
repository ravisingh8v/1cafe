import store from "@/store";
import axios from "axios";

const Http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

Http.interceptors.request.use((config: any) => {
    // console.log(config);
    if (config.method != 'delete') {
        store.commit('auth/isLoading', true)
    }

    return config
})
Http.interceptors.response.use((config: any) => {
    setTimeout(() => {
        store.commit('auth/isLoading', false)
    }, 500)
    return config
})

export default Http