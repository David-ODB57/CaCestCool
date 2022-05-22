<template>
  <sign-up />
</template>

<script>
import SignUp from "@/components/SignUp.vue";
export default {
  name: "HomePage",
  components: {
    SignUp,
  },
  computed: {
    logged() {
      return this.$store.getters.getUserStatus;
    },
  },
  mounted() {
    if (this.logged) {
      this.$router.push(`/auth/user/profil/home`);
    }
  },
};
</script>
<style scoped>
body {
  min-height: 100vh;
  background: url("../assets/images/bg.webp") no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
