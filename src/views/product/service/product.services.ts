import { Cart } from '@/component/cart/model/CartModel';
import Http from '@/interceptor/http.interceptor';
import store from '@/store';
const url = process.env.VUE_APP_BASE_URL
const userId = localStorage.getItem('userId')

class ProductService {
    /**
        * 
        * @returns products or handling error
        */
    getAllProducts() {
        return Http.get(url + 'products.json').then((res: any) => {
            const responseData: Cart[] = res.data
            return responseData
        }).catch((res: any) => {
            store.commit('auth/isLoading', false)
            if (res.response.status == 404) {
                alert('something went wrong please try after sometime')
            }
            return res.message
        })
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    async addToCart(data: Cart) {

        // const userId = localStorage.getItem('userId')
        const cartId = data.id || data.editId

        if (data.editId || data.id.length > 5) {
            console.log('now worked');

            // delete data.edit
            return await Http.put(`${url}users/${userId}/cart/${cartId}.json`, data).then((res: any) => {
                return res.data
            }).catch((res: any) => {
                store.commit('auth/isLoading', false)
                return res.message
            })
        } else {
            console.log('this is also worked');

            return await Http.post(`${url}users/${userId}/cart.json`, data).then((res) => {
                console.log(res);
            }).catch((res: any) => {
                store.commit('auth/isLoading', false)
                return res.message
            })
        }
    }
    async getCartData() {
        // const userId = localStorage.getItem('userId')
        return Http.get(`${url}users/${userId}/cart.json`).then((res: any) => {
            const responseData: Cart[] = res.data
            return responseData
        }).catch((res) => {
            store.commit('auth/isLoading', false)
            return res.message
        })
    }
    async deleteCartItem(id: number) {
        Http.interceptors.response.use()
        const cartId = id
        return Http.delete(`${url}users/${userId}/cart/${cartId}.json`)
    }
}

const productService = new ProductService
export default productService