import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import BaseButton from './UI/BaseButton.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const preload = async () => {
    const token = localStorage.getItem("auth");
    if (token) {
        await store.dispatch("login", token.username);
    }

    const app = createApp(App);
    app.use(router);
    app.use(store);

    app.component("base-button", BaseButton);
    app.component('pulse-loader', PulseLoader);
    app.mount("#app");


};

preload();


