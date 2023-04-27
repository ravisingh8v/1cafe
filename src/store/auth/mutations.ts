export default {
    isLoading(state: any, payload: any) {
        state.isLoading = payload
    },
    setUserId(state: any, payload: any) {
        state.userId = payload
    },
    setUser(state: any, payload: any) {
        state.activeUser = payload
    },
    setAuthentication(state: any, payload: any) {
        state.isAuthenticated = payload
    },
    showGuardAlert(state: any, payload: any) {
        state.showGuardAlert = payload
    }
}