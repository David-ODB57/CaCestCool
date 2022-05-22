<template>
  <div
    class="post-card"
    @click="
      $router.push(`/auth/user/${$store.state.user.id}/posts/${post._id}`)
    "
  >
    <div class="avatar">
      <img
        class="avatar"
        :src="`${post.author.avatar}`"
        alt="avatar de l'utilisateur"
      />
    </div>
    <div class="post-title-content">
      <h3>{{ post.title }}</h3>
      <p>
        {{ post.body }}
      </p>
      <div class="comment-status">
        <div class="comment-number">
          <img
            class="icon-dialog-box"
            src="@/assets/images/comments.svg"
            alt="total comments"
          />
          <span v-if="post.comments">{{ post.comments.length }} comments</span>
          <span v-else>no comments yet</span>
        </div>
        <div class="comment-likes">
          <span :class="isLiked ? 'post-liked' : ''">{{ post.likes }}</span>
          <svg
            id="likes"
            :class="isLiked ? 'post-liked' : ''"
            width="14"
            height="14"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            @click.stop="addOneLike"
          >
            <path
              d="M16.4724 20H4.1C3.76863 20 3.5 19.7314 3.5 19.4V9.6C3.5 9.26863 3.76863 9 4.1 9H6.86762C7.57015 9 8.22116 8.6314 8.5826 8.02899L11.293 3.51161C11.8779 2.53688 13.2554 2.44422 13.9655 3.33186C14.3002 3.75025 14.4081 4.30635 14.2541 4.81956L13.2317 8.22759C13.1162 8.61256 13.4045 9 13.8064 9H18.3815C19.7002 9 20.658 10.254 20.311 11.5262L18.4019 18.5262C18.1646 19.3964 17.3743 20 16.4724 20Z"
              stroke="currentColor"
              stroke-linecap="round"
            />
            <path
              d="M7 20L7 9"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    addOneLike() {
      const postId = this.post._id;
      const userId = this.$store.getters.getUserId;
      const token = this.$store.getters.getToken;

      // User ne peux pas 'liker' ses propres posts
      if (this.post.author._id === userId) return;

      this.isLiked = !this.isLiked;

      if (this.isLiked) {
        this.$store.dispatch("addOneLike", {
          token: token,
          ids: {
            operator: "inc",
            postId: postId,
            userId: userId,
          },
        });
      } else {
        this.$store.dispatch("addOneLike", {
          token: token,
          ids: {
            operator: "dec",
            postId: postId,
            userId: userId,
          },
        });
      }
    },
  },
  mounted() {
    const userId = this.$store.getters.getUserId;
    const listOfLikers = this.post.usersLikedIt;

    if (listOfLikers.includes(userId)) this.isLiked = true;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.post-card {
  max-height: 128px;
  min-width: 488px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 30px;
  padding: 18px 27px;
  margin: 41px 0;
}
.post-card:hover {
  cursor: pointer;
}
.post-title-content {
  width: 100%;
  margin-left: 22px;
  font-family: "Inter";
  font-style: normal;
  font-size: 16px;
}
h3 {
  font-size: 16px;
  font-weight: 600;
}
p {
  max-width: 348px;
  max-height: 42px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
img.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
span {
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 12px;
}
.comment-status {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.comment-status span {
  margin: 0 3px;
}
.comment-number,
.comment-likes {
  display: flex;
  align-items: center;
}

span.post-liked {
  color: #0085ff;
  font-weight: 700;
}
#likes:hover {
  cursor: pointer;
}

#likes.post-liked {
  fill: #0085ff;
  color: #0085ff;
  cursor: pointer;
}
</style>