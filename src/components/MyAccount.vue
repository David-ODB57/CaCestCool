<template>
  <div class="wall-infos">
    <!-- <form></form> -->
    <ul>
      <li v-for="datum in $store.getters.userData" :key="datum">{{ datum }}</li>
    </ul>
    <p>{{ $store.state.user }}</p>
    <router-link to="/user/changePassword">Changer mot de passe</router-link>
  </div>
</template>

<script>
export default {
  name: "MyAccount",
  //   data() {
  //     return {
  //       posts: [],
  //     };
  //   },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(JSON.parse(localStorage.getItem("user")).id);
    console.log(this.$store.dispatch("getUserAccount", user));
    // this.posts = this.$store.dispatch("getUserAccount", user);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&family=Timmana&display=swap");

.wall-infos {
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