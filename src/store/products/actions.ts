import axios from "axios"

export default {
    getAllProducts(context: any) {
        context.commit('isLoading', true)

        axios.get(`${process.env.VUE_APP_BASE_URL}products.json`).then((response) => {
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

    /**
     * 
     * @param context 
     * @param payload 
     */

    async addToCart(context: any, payload: any) {
        context.commit('isLoading', true)
        const userId = localStorage.getItem('userId')
        // id is greater than 5 means its firebase auto generated id 
        if (payload.id.length > 5) {
            const cartId = payload.id
            axios.put(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart/${cartId}.json`, { ...payload }).then((response) => {
                console.log(response);
                context.commit('isLoading', false)
                context.dispatch('getCartData')
            }).catch(() => {
                context.commit('isLoading', false)
            })
            // if its manual generated id
        } else {
            axios.post(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart.json`, { ...payload }).then((response) => {
                console.log(response);
                context.commit('isLoading', false)
                context.dispatch('getCartData')
            }).catch(() => {
                context.commit('isLoading', false)
            })
        }
        // console.log(userId);
        // console.log(context);


    },
    /**
     * get Cart Data
     * @param context 
     */
    getCartData(context: any) {
        const userId = localStorage.getItem('userId')
        context.commit('isLoading', true)
        axios.get(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart.json`).then((response: any) => {
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

    /**
     * 
     * @param context 
     * @param payload 
     */
    async deleteCartItem(_: any, payload: any) {
        const userId = localStorage.getItem('userId')
        const cartItemId = payload;
        await axios.delete(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart/${cartItemId}.json`).then((response) => {
            console.log(response);
        })
    }
}