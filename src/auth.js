import axios from "axios";
import { server } from "./utils/helper";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, value) {
            state.user = value;
        },
    },
    actions: {
        async role({ commit }) {
            await axios
                .get(`${server.baseURL}/auth/login`)
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_USER", data);
                    if (localStorage.getItem("x_xsrf_token")) {
                        commit("SET_AUTHENTICATED", true);
                    }
                })
                .catch(() => {
                    commit("SET_USER", {});
                    commit("SET_AUTHENTICATED", false);
                });
        },
        logout({ commit }) {
            commit("SET_USER", {});
            commit("SET_AUTHENTICATED", false);
            commit("SET_ADMIN", false);
        },
    },
};