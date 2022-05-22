<template>
  <div class="wall-messages">
    <h1>Mes Messages</h1>
    <hr />
    <div class="messages-container" v-if="successful">
      <post-card
        :post="post"
        v-for="(post, index) in userPosts"
        :key="index"
      ></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "MyProfilWall",
  components: { PostCard },
  data() {
    return {
      successful: false,
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      id: "getUserId",
      userPosts: "getUserPosts",
    }),
  },
  async mounted() {
    await this.$store
      .dispatch("getUserPosts", {
        id: this.id,
        token: this.token,
      })
      .then((res) => {
        if (res.status !== 200) {
          this.successful = false;
        } else {
          this.successful = true;
        }
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&family=Timmana&display=swap");

.wall-messages {
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
.messages-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>