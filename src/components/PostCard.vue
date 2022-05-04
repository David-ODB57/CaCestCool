<template>
  <div class="post-card">
    <div class="avatar">
      <img class="avatar" :src="`${$store.getters.userAvatar}`" alt="" />
    </div>
    <div class="post-title-content">
      <h3>Title</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, optio
        eveniet! Ex id fugit deleniti nisi cupiditate! Nam ut quasi itaque, sit
        eveniet labore obcaecati officiis veniam, dolores, beatae dolor. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Illum, optio
        eveniet! Ex id fugit deleniti nisi cupiditate! Nam ut quasi itaque, sit
        eveniet labore obcaecati officiis veniam, dolores, beatae dolor.
      </p>
      <div class="comment-status">
        <div class="comment-number">
          <img
            class="icon-dialog-box"
            :src="require('../assets/images/comments.svg')"
            alt="total comments"
          />
          <span>3 comments</span>
        </div>
        <div class="comment-likes">
          <span>3</span>
          <img
            class="icon-thumb-up"
            :src="require('../assets/images/likes.svg')"
            alt="total likes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.post-card {
  max-height: 128px;
  max-width: 488px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 30px;
  padding: 18px 27px;
}
.post-title-content {
  margin-left: 22px;
}
p {
  max-width: 348px;
  max-height: 42px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
img.avatar {
  width: 60px;
  height: 60px;
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
</style>