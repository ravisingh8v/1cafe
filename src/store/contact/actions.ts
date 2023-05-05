import axios from "axios"

export default {
    async sendingUserMessage(context: any, payload: any) {
        context.rootState.auth.isLoading = true

        console.log(context.rootState);

        const userId = localStorage.getItem('userId')
        const activeUser = context.rootGetters['auth/activeUser']

        await axios.post(`${process.env.VUE_APP_BASE_URL}contact-us.json`, { userId: userId, firstName: activeUser.firstName, lastName: activeUser.lastName, email: activeUser.email, message: payload.message, time: payload.time, day: payload.day }).then((res) => {
            console.log(res);

            context.rootState.auth.isLoading = false
        }).catch((error) => {
            context.rootState.auth.isLoading = false
            throw error.message
        })
    }
}