<template>
  <div class="wall-posts">
    <h1>Mon Mur</h1>
    <hr />
    <div class="posts-container" v-if="postsList">
      <post-card
        :post="post"
        v-for="(post, index) in postsList"
        :key="index"
      ></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";

export default {
  name: "MyProfilHome",
  components: { PostCard },
  data() {
    return {
      successful: false,
    };
  },
  computed: {
    postsList() {
      return this.$store.state.posts;
    },
  },
};
</script>

<style scoped>
.wall-posts {
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
.posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>