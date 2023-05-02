import axios from "axios"

export default {
    getAllProducts(context: any) {
        context.commit('isLoading', true)

        axios.get('https://cafe-410be-default-rtdb.firebaseio.com/products.json').then((response) => {
            const responseData = [];
            for (const key in response.data) {
                const data = {
                    id: key,
                    imageUrl: response.data[key].imageUrl,
                    title: response.data[key].title,
                    description: response.data[key].description,
                    price: response.data[key].price,
                    category: response.data[key].category
                }
                responseData.push(data)
            }
            context.commit('isLoading', false)
            context.commit('getAllProducts', responseData)
        }).catch((response) => {
            context.commit('isLoading', false)
            const error = response
            throw error
        })
    },



    async addToCart(context: any, payload: any) {
        const userId = localStorage.getItem('userId')
        // console.log(userId);
        // console.log(context);
        context.commit('isLoading', true)

        axios.post(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}/cart.json`, { ...payload }).then((response) => {
            console.log(response);
            context.commit('isLoading', false)
            context.dispatch('getCartData')
        }).catch(() => {
            context.commit('isLoading', false)
        })

    },

    // get Cart Data 
    getCartData(context: any) {
        const userId = localStorage.getItem('userId')
        context.commit('isLoading', true)
        axios.get(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}/cart.json`).then((response: any) => {
            const responseData = [];
            for (const key in response.data) {
                const responses = response.data[key]
                const data = {
                    id: key,
                    category: responses.category,
                    description: responses.description,
                    imageUrl: responses.imageUrl,
                    price: responses.price,
                    quantity: responses.quantity,
                    title: responses.title,
                    totalPrice: responses.totalPrice
                }
                responseData.push(data)
            }

            context.commit('getCartData', responseData)
            context.commit('isLoading', false)
        }).catch(() => {

            context.commit('isLoading', false)
        })
    },

    async deleteCartItem(context: any, payload: any) {
        const userId = localStorage.getItem('userId')
        const cartItemId = payload;
        await axios.delete(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}/cart/${cartItemId}.json`).then((response) => {
            console.log(response);
        })
    }
}