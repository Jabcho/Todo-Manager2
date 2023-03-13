import { createApp } from 'vue'
//import './assets/global.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons"
import { BiCheckCircle, CoDelete, FaUserAlt, FaLock, RiCalendarTodoFill, LaSlackHash, HiViewList, IoCloseCircleOutline } from "oh-vue-icons/icons"

addIcons(BiCheckCircle, CoDelete, FaUserAlt, FaLock, RiCalendarTodoFill, LaSlackHash, HiViewList, IoCloseCircleOutline );

const pinia = createPinia();
const PersistedState = createPersistedState();
pinia.use((context) => PersistedState(context))

const app = createApp(App);
app.component("v-icon", OhVueIcon)
app.use(pinia).use(router).mount('#app')
