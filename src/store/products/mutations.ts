export default {
    getAllProducts(state: any, payload: any) {
        state.allProducts = payload
    },
    isLoading(state: any, payload: any) {
        state.isLoading = payload
    }
}