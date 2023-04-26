import { user } from "@/views/auth/model/ModelRegistration"
import axios from "axios"

export default {
    // register user into database 
    async registration(context: any, payload: user) {
        context.commit('isLoading', true)
        try {
            axios.post("https://cafe-410be-default-rtdb.firebaseio.com/users.json", payload)
            // const responseData = await response
            // if (responseData) {
            context.commit('isLoading', false)
            // }
        } catch (error) {
            context.commit('isLoading', false)
        }
        // context.commit('registration', payload)
    },

    // signup
    async signUpWithEmailPassword(context: any, payload: user) {
        context.commit('isLoading', true)
        try {
            const response = axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyHUgf2WKTaBYttSOTf-mifdTj7qRCg8E", { email: payload.email, password: payload.password, returnSecureToken: true })
            const responseData = await response
            context.commit('isLoading', false)
            console.log(responseData);

        } catch (error: any) {
            context.commit('isLoading', false)
            const msg = error.response.data.error.message.toLowerCase()
            let errors = '';
            if (msg == 'email_exists') {
                errors = 'Email already exist try login'
                // throw errors
            } else {
                errors = "Something went wrong please try after sometimes"
                // throw errors
            }
            throw errors


        }

    }
}