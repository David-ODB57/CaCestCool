<template>
  <div class="wall-content">
    <my-profil-menu />
    <component :is="currentPage"></component>
  </div>
</template>

<script>
import MyProfilHome from "@/components/MyProfilHome.vue";
import MyProfilMenu from "@/components/MyProfilMenu.vue";
import MyProfilAccount from "@/components/MyProfilAccount.vue";
import MyProfilWall from "@/components/MyProfilWall.vue";
import MyProfilMessages from "@/components/MyProfilMessages.vue";
import { mapGetters } from "vuex";

export default {
  name: "MyProfil",
  components: {
    MyProfilHome,
    MyProfilMenu,
    MyProfilAccount,
    MyProfilWall,
    MyProfilMessages,
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentProfilPage",
    }),
  },
};
</script>

<style>
.wall-content {
  display: flex;
  min-height: 100vh;
}
</style>