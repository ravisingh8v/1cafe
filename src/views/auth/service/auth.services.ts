import Http from '@/interceptor/http.interceptor';
import store from '@/store';
import { user } from '../model/ModelRegistration';
const url = process.env.VUE_APP_BASE_URL

class AuthService {
    async registration(userData: user) {
        const userId = store.getters['auth/userId'] || localStorage.getItem('userId')

        return Http.patch(`${url}users/${userId}.json`, userData).then((res) => {
            return res.data
        }).catch((res: Error) => { store.commit('auth/isLoading', false); return res.message })
    }

    async signUpWithEmailPassword(user: user) {
        // console.log(user);
        return Http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyHUgf2WKTaBYttSOTf-mifdTj7qRCg8E", { ...user, returnSecureToken: true })
            .then((res: any) => {
                const responseData = res.data;

                store.commit('auth/setUserId', responseData.localId);
            }).catch((error: any) => {
                store.commit('auth/isLoading', false);
                const msg = error.response.data.error.message.toLowerCase();
                let errors = '';
                if (msg == 'email_exists') {
                    errors = 'Email already exist try login'
                } else {
                    errors = "Something went wrong please try after sometimes"
                }
                throw errors
            })
    }

    async userLogin(user: user) {
        // console.log(user);

        return Http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyHUgf2WKTaBYttSOTf-mifdTj7qRCg8E`, { ...user, returnSecureToken: true })
            .then((res) => {
                return res.data
            }).catch((res) => {
                store.commit('auth/isLoading', false)
                return res
            })
    }

    async getUserData() {
        const userId = localStorage.getItem('userId')
        return Http.get(`${url}users/${userId}.json`).then((res) => {
            const responseData = res.data
            return store.commit('auth/setUser', responseData)

        }).catch((res) => {
            console.warn(res)
        })
    }
}
const authService = new AuthService;

export default authService;