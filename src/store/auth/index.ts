// importing auth stores 
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
export default ({
    namespaced: true,
    state: {
        isLoading: false
    },
    getters,
    mutations,
    actions
})