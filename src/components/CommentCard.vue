<template>
  <div class="content">
    <div class="avatar">
      <img :src="avatar" alt="user avatar" />
      <span class="time">{{ time }}</span>
      <span class="date">{{ date }}</span>
    </div>
    <div
      :class="
        data.author === $store.state.user.id ? 'comment-author' : 'comment'
      "
    >
      <div class="user-comment">
        <h5>{{ author }}</h5>
        <p>
          {{ data.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: ["data"],
  computed: {
    time() {
      return new Date().toISOString().split("T")[1].substring(0, 5);
    },
    date() {
      return new Date().toISOString().split("T")[0];
    },
    author() {
      return `${this.$store.state.user.prenom} ${this.$store.state.user.nom}`;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
  },
};
</script>

<style scoped>
h5 {
  font-family: Inter;
  font-weight: 700;
  font-size: 15px;
  color: currentColor;
}
p {
  font-family: Inter;
  font-weight: 400;
  font-size: 12px;
  color: currentColor;
}
.content {
  display: flex;
}
.avatar {
  display: flex;
  flex-direction: column;
  margin-right: 22px;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.time {
  color: #444444;
  font-family: Inter;
  font-weight: 300;
  font-size: 15px;
}
.date {
  color: #444444;
  font-family: Inter;
  font-weight: 300;
  font-size: 10px;
  font-style: italic;
}
.comment,
.comment-author {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 23px 19px;
  background: #dedede;
  border-radius: 30px;
  color: #444444;
}
.comment-author {
  background: #0085ff;
  color: white;
}
.content {
  margin-bottom: 34px;
}
</style>