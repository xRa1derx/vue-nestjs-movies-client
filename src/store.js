import { createStore } from "vuex";
import { server } from "./utils/helper";
import axios from "axios";
import router from "./router";
// import auth from "./auth";

const store = createStore({
    // modules: {
    //     auth,
    // },
    state() {
        return {
            // isLoginOpen: false,
            authenticated: false,
            user: {},
            movies: []
        };
    },
    mutations: {
        // setLoginOpen(state) {
        //     state.isLoginOpen = !state.isLoginOpen;
        // },
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, value) {
            state.user = value;
        },
        SET_MOVIES(state, movies) {
            state.movies = movies;
        },
        SORT_MOVIES(state, sortBy) {

            sortBy === 'по убыванию' ? state.movies.sort((a, b) => b.rating - a.rating) : state.movies.sort((a, b) => a.rating - b.rating)
        }
    },
    actions: {
        // loginOpen(context) {
        //     context.commit("setLoginOpen");
        // },
        getMovies({ commit }) {
            axios.get(`${server.baseURL}/movies`).then((movies) => {
                commit("SET_MOVIES", movies.data);
            });
        },
        sortMovies({ commit }, sortBy) {
            commit('SORT_MOVIES', sortBy);
        },
        login({ commit }, username) {
            commit("SET_USER", username);
            commit('SET_AUTHENTICATED', true)
        },
        logout({ commit }) {
            commit("SET_USER", {});
            commit("SET_AUTHENTICATED", false);
            router.push({ name: 'home' })
        },
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },
});

export default store;