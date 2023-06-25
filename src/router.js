import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/MainPage.vue';
import ShowMovie from './components/ShowMovie.vue';
import StoreFilm from './components/StoreFilm.vue';
import store from './store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home page'
        },
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: ShowMovie,
        meta: {
            title: 'Movie'
        },
    },
    {
        path: '/movie/add',
        name: 'add.movie',
        component: StoreFilm,
        meta: {
            middleware: "auth",
            title: 'Add movie'
        },
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    document.title = `${to.meta.title}`;
    if (to.meta.middleware == "auth") {
        if (store.state.authenticated) {
            next();
        } else {
            next({ name: "home" });
        }
    } else {
        next();
    }
});

export default router;