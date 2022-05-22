<template>
  <div class="wall-menu">
    <div class="menu-header">
      <img :src="require('../assets/images/logo.svg')" alt="logo" />
      <div class="menu-header-avatar">
        <img
          :src="$store.state.user.avatar"
          alt="my avatar"
          @click="goToHome"
        />
      </div>
      <h2>{{ fullName }}</h2>
    </div>
    <div class="wall-menu-links">
      <div class="menu-links">
        <a
          class="menu-link"
          :class="[{ active: currentPage === menu.id }]"
          v-for="menu in menus"
          :key="menu.id"
          @click="changeCurrentPageComponent"
          :id="menu.id"
        >
          {{ menu.name }}
        </a>
      </div>
      <button
        v-if="status"
        class="btn btn-outline-primary"
        type="button"
        @click="logout"
      >
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyProfilMenu",
  computed: {
    ...mapGetters({
      fullName: "getFullName",
      currentPage: "getCurrentProfilPage",
      menus: "getProfilMenuList",
      status: "getUserStatus",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    changeCurrentPageComponent(e) {
      // e.target.id --> "MyProfilAccount" ou "MyProfilMessages" ou "MyProfilWall"
      let currentMenu = e.target.id;
      this.$store.dispatch("profilMenuChange", currentMenu);
    },
    goToHome() {
      this.$store.dispatch("profilMenuChange", "MyProfilHome");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

body {
  background: linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed),
    linear-gradient(0deg, #ededed, #ededed), #ededed;
}
.wall-menu {
  min-width: 360px;
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #d5ebff 0%, #e2e9ef 100%);
}
.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-header img {
  width: 103px;
  height: 41px;
  margin: 52px 0 0;
  cursor: pointer;
}
.menu-header-avatar img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  margin-top: 39px;
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

.menu-links {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
}
.menu-links a {
  cursor: pointer;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
}
.menu-links a:hover,
.menu-links a.active {
  font-weight: 700;
}
.menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 39px;
}
.notification {
  width: 30px;
  height: 30px;
  background: #0085ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}
.tooltiptext {
  bottom: 125%;
  left: 50%;
  margin-left: -70px;
  width: 140px;
  padding: 5px 10px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 8px;
  line-height: 7px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #444444;
  position: absolute;
  z-index: 1;
}
.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}
.btn {
  max-width: min-content;
  margin: 30px 0;
}
</style>