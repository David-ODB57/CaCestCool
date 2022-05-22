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
