import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import AuthService from "../services/auth.service.js";

Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem("user"));
const posts = JSON.parse(localStorage.getItem("allPosts"));
const userPosts = JSON.parse(localStorage.getItem("userPosts"));

const store = new Vuex.Store({
  state: {
    status: {
      logged: user ? true : false,
    },
    user: user ? user : null,
    posts: posts ? posts : [],
    userPosts: userPosts ? userPosts : [],
    profilMenuList: [
      { id: "MyProfilWall", name: "Mon mur" },
      { id: "MyProfilMessages", name: "Mes messages" },
      { id: "MyProfilAccount", name: "Mon compte" },
    ],
    currentActivePage: "MyProfilHome",
  },
  getters: {
    listOfPosts(state) {
      return state.posts;
    },
    getUserPosts(state) {
      return state.userPosts;
    },
    getCurrentProfilPage(state) {
      return state.currentActivePage;
    },
    getProfilMenuList(state) {
      return state.profilMenuList;
    },
    getToken(state) {
      return state.user.accessToken;
    },
    getUserAvatar(state) {
      return state.user.avatar;
    },
    getUserFirstName(state) {
      return state.user?.prenom;
    },
    getUserLastName(state) {
      return state.user?.nom;
    },
    getFullName(state) {
      let fullName = `${state.user.nom}  ${state.user.prenom}`;
      return fullName ? fullName : "Mon Pseudo";
    },
    getUserEmail(state) {
      return state.user?.email;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserStatus(state) {
      return state.status.logged;
    },
    getPostSpec: (state) => (id) => {
      return state.posts.find((elm) => elm._id === id);
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
      setTimeout(() => router.push(`/auth/user/profil/home`), 1000);
    },
    loginFailure(state) {
      state.status.logged = false;
      state.user = null;
    },
    logout(state) {
      state.status.logged = false;
      state.user = null;
      state.posts = [];
      state.userPosts = [];
      setTimeout(() => router.push("/login"), 1000);
    },
    changeCurrentProfilPage(state, newCurrentProfilPage) {
      state.currentActivePage = newCurrentProfilPage;
    },
    updateUserProfilAvatarSuccess(state, avatar) {
      state.user.avatar = avatar;
    },
    updateUserProfilIdsSuccess(state, ids) {
      state.user = { ...state.user, ...ids };
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    editPost(state, post) {
      state.posts = [
        ...state.posts.map((item) =>
          item._id !== post._id ? item : { ...item, ...post }
        ),
      ];
    },
    getAllPostSuccess(state, posts) {
      state.posts = posts;
    },
    getAllPostFailed(state) {
      state.posts = [];
    },
    getAllUserPostsSuccess(state, userPosts) {
      state.userPosts = userPosts;
    },
    getAllUserPostsFailed(state) {
      state.userPosts = [];
    },
    updateLikes(state, postToUpdate) {
      state.posts.push(postToUpdate.data);
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
    profilMenuChange({ commit }, newCurrentProfilPage) {
      commit("changeCurrentProfilPage", newCurrentProfilPage);
    },
    async updateUserIds({ commit }, updateIds) {
      return await AuthService.updateUserProfilIds(updateIds).then(
        (response) => {
          let localStorageUser = JSON.parse(localStorage.getItem("user"));

          localStorageUser = { ...localStorageUser, ...updateIds.data };
          localStorage.setItem("user", JSON.stringify(localStorageUser));
          commit("updateUserProfilIdsSuccess", response.data.updatedInfo);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async updateUserAvatar({ commit }, userUpdate) {
      return await AuthService.updateUserProfilAvatar(userUpdate).then(
        (response) => {
          const localStorageUser = JSON.parse(localStorage.getItem("user"));
          const avatar = response.data.avatar;

          localStorageUser.avatar = avatar;
          localStorage.setItem("user", JSON.stringify(localStorageUser));
          commit("updateUserProfilAvatarSuccess", avatar);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async updateUserPwd({ dispatch }, userUpdatePwd) {
      return await AuthService.userUpdateProfilPwd(userUpdatePwd).then(
        (response) => {
          console.log(response);
          dispatch("logout");
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    async addOneLike({ commit, state }, postAndUserIds) {
      console.log(postAndUserIds);
      return await AuthService.addOneLike(postAndUserIds).then(
        (response) => {
          const postUpdatedId = response.data._id;
          const postIndex = state.posts.findIndex(
            (elm) => elm._id === postUpdatedId
          );
          commit("updateLikes", { data: response.data, index: postIndex });
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    async getAllPosts({ commit }, token) {
      return await AuthService.getAllPosts(token).then(
        (response) => {
          commit("getAllPostSuccess", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAllPostFailed");
          return Promise.reject(error);
        }
      );
    },
    async getUserPosts({ commit }, user) {
      return await AuthService.getUserPosts(user.id, user.token).then(
        (response) => {
          commit("getAllUserPostsSuccess", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAllUSerPostFailed");
          return Promise.reject(error);
        }
      );
    },
    async addPost({ commit }, postToken) {
      return await AuthService.newPost(postToken.data, postToken.token).then(
        (response) => {
          const localStoragePosts = JSON.parse(
            localStorage.getItem("allPosts")
          );
          const postToadd = response.data;

          localStoragePosts.push(postToadd);
          localStorage.setItem("allPosts", JSON.stringify(localStoragePosts));
          commit("addPost", response.data);
          commit("changeCurrentProfilPage", "MyProfilMessages");
          setTimeout(() => router.push(`/auth/user/profil/home`), 1000);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async editPost({ commit }, postEditedToken) {
      return await AuthService.editPost(
        postEditedToken.data,
        postEditedToken.postId,
        postEditedToken.token
      ).then(
        (response) => {
          const localStoragePosts = JSON.parse(
            localStorage.getItem("allPosts")
          );
          const updatedPost = response.data;

          localStoragePosts.push(updatedPost);
          localStorage.setItem("allPosts", JSON.stringify(localStoragePosts));
          commit("editPost", response.data);
          commit("changeCurrentProfilPage", "MyProfilMessages");
          setTimeout(() => router.push(`/auth/user/profil/home`), 1000);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async deletePost({ commit, dispatch }, postToken) {
      return await AuthService.deletePost(
        postToken.postId,
        postToken.token
      ).then(
        (response) => {
          commit("changeCurrentProfilPage", "MyProfilMessages");
          dispatch("getAllPosts", postToken.token);
          setTimeout(() => router.push(`/auth/user/profil/home`), 1000);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    async addComment(_, commentToken) {
      return await AuthService.newComment(
        commentToken.data,
        commentToken.token
      ).then(
        (response) => {
          // commit("changeCurrentProfilPage", "MyProfilMessages");
          // setTimeout(() => router.push(`/auth/user/profil/home`), 1000);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  modules: {},
});

export default store;
