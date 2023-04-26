import { createApp } from 'vue'
import App from './App.vue'
// imports 
import router from './router'
import store from './store'
// import components 
import BaseCard from "@/ui/BaseCard.vue";
import BaseDialog from '@/ui/BaseDialog.vue'

const app = createApp(App)

app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.use(store)
app.use(router)
app.mount('#app')
