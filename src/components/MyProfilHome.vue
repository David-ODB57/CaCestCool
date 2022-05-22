<template>
  <div class="home-page">
    <h1>Ma page d'accueil</h1>
    <my-welcome />
    <hr />
    <router-link :to="'/auth/user/posts/add'" class="btn btn-outline-primary"
      >Créer un post</router-link
    >
  </div>
</template>

<script>
import MyWelcome from "@/components/MyWelcome.vue";

export default {
  name: "MyProfilHome",
  components: { MyWelcome },
  async mounted() {
    const token = this.$store.getters.getToken;

    await this.$store.dispatch("getAllPosts", token);
  },
};
</script>

<style scoped>
.home-page {
  width: 100%;
  margin: 132px 67px 0 67px;
}
h1 {
  font-family: "Timmana", sans-serif;
  font-weight: 400;
  font-size: 36px;
  color: hsla(0, 0%, 51%, 1);
}
hr {
  border: 1px solid #dddddd;
  margin: 23px 0 41px;
}
</style>