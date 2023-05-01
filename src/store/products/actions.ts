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

        // payload
        context.commit('isLoading', true)

        axios.post(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}/cart.json`, { ...payload }).then((response) => {
            console.log(response);
            context.commit('isLoading', false)
        }).catch(() => {

            context.commit('isLoading', false)
        })

    },
    // get Cart Data 
    getCartData(context: any) {
        const userId = localStorage.getItem('userId')
        context.commit('isLoading', true)
        axios.get(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}/cart.json`).then((response: any) => {
            console.log(response);
            context.commit('isLoading', false)

        }).catch(() => {

            context.commit('isLoading', false)
        })
    }

}