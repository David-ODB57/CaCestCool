import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import AuthService from "../services/auth.service.js";

Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { status: { logged: true }, user }
  : { status: { logged: false }, user: null, posts: [], userData: [] };

const store = new Vuex.Store({
  state: initialState,
  getters: {
    userAvatar(state) {
      if (state.user) return state.user.avatar;
    },
    listOfPosts(state) {
      console.log(state.posts);
      return state.posts;
    },
    userData(state) {
      return state.userData;
    },
  },
  mutations: {
    signUpSuccess(state) {
      state.status.logged = false;
      setTimeout(() => router.push("/login"), 2000);
    },
    signUpFailed(state) {
      state.status.logged = false;
    },
    loginSuccess(state, user) {
      state.status.logged = true;
      state.user = user;
      setTimeout(() => router.push("/user/profil"), 1000);
    },
    loginFailure(state) {
      state.status.logged = false;
      state.user = null;
    },
    logout(state) {
      state.status.logged = false;
      state.user = null;
      state.posts = [];
      setTimeout(() => router.push("/login"), 1000);
    },
    getUserAccountSuccess(state, userData) {
      state.userData = userData;
    },
    getUserAccountFailed(state) {
      state.userData = [];
    },
    getAllPostSuccess(state, posts) {
      console.table(posts);
      state.posts = posts;
    },
    getAllPostFailed(state) {
      state.posts = [];
    },
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          console.log("sending error");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    signUp({ commit }, newUser) {
      return AuthService.signUp(newUser).then(
        (response) => {
          commit("signUpSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("signUpFailed");
          return Promise.reject(error);
        }
      );
    },
    getUserAccount({ commit }, user) {
      return AuthService.getUserAccount(user).then(
        (response) => {
          console.log(response.data);
          commit("getUserAccountSuccess", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("getUserAccountFailed");
          return Promise.reject(error);
        }
      );
    },
    getAllPosts({ commit }, state, user) {
      return AuthService.getAllPosts(user).then(
        (response) => {
          console.log(response);
          console.log(state.posts);
          commit("getAllPostSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("getAllPostFailed");
          return Promise.reject(error);
        }
      );
    },
  },
  modules: {},
});

export default store;
