import { createApp } from 'vue'
import App from './App.vue'

// TokenRefresh Interceptor
import setupInterceptors from './services/setupInterceptors'

setupInterceptors(store)

// Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// StyleSheet
import './assets/style.css'

// Router
import router from "./router";

// Store
import store from "./store";

// FontAwesome Icons
import { FontAwesomeIcon } from './plugins/fontawesome'

const app = createApp(App)

app.use(router)
app.use(store)
app.component("fa-icon", FontAwesomeIcon)
app.mount('#app')
