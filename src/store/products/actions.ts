import axios from "axios"

export default {
    getAllProducts(context: any) {
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

            context.commit('getAllProducts', responseData)
        })
    }
}