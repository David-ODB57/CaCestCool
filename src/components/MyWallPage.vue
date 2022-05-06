<template>
  <div class="wall-posts">
    <h1>Mon Mur</h1>
    <hr />
    <post-card
      v-for="post in $store.getters.listOfPosts"
      :key="post"
    ></post-card>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";

export default {
  name: "MyWallPage",
  components: { PostCard },
  // data() {
  //   return {
  //     posts: [],
  //   };
  // },
  // computed: {
  //   posts() {
  //     return this.$store.dispatch("getAllPosts");
  //   },
  // },
  mounted() {
    // console.table(this.$store.state.posts);
    // console.log(this.$store.state.user);
    this.$store.dispatch("getAllPosts");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&family=Timmana&display=swap");

.wall-posts {
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