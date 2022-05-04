<template>
  <div class="wall-menu">
    <div class="menu-header">
      <img :src="require('../assets/images/logo.svg')" alt="logo" />
      <div class="menu-header-avatar">
        <img :src="`${$store.getters.userAvatar}`" alt="my avatar" />
      </div>
      <h2>Mon Pseudo</h2>
    </div>
    <div class="wall-menu-links">
      <div class="menu-links">
        <router-link to="/posts/">Mon Mur</router-link>
        <router-link to="/posts/user/:id">Mes messages</router-link>
        <router-link to="/profil">Mon compte</router-link>
        <button type="button" @click="logout">Se déconnecter</button>
      </div>
      <div class="menu-notifications">
        <div class="posts-notifications"></div>
        <div class="comments-notifications"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyWallMenu",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-header img {
  width: 103px;
  height: 41px;
  margin: 52px 0 0;
}
.menu-header-avatar img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  margin-top: 39px;
}
body {
  background: linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed), #ededed;
}
.wall-menu {
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #d5ebff 0%, #e2e9ef 100%);
}
h2 {
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 19px 0 22px;
  background: hsla(0, 0%, 93%, 0.37);
}

.wall-menu-links {
  margin: 58px 17px 0 43px;
}

.menu-links a:link {
  display: inline-flex;
  flex-direction: column;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  margin-bottom: 39px;
}
</style>