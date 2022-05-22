<template>
  <sign-in />
</template>

<script>
import SignIn from "@/components/SignIn.vue";

export default {
  name: "LoginPage",
  components: {
    SignIn,
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
