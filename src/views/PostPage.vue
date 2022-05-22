<template>
  <div class="post">
    <div class="header">
      <div class="date">
        {{ convertDate || "pas de date" }}
      </div>
      <button
        type="button"
        v-if="$route.params.userId === $store.state.user.id"
        class="btn btn-outline-danger"
        @click="deletePost"
      >
        Supprimer
      </button>
      <button
        type="button"
        v-if="$route.params.userId === $store.state.user.id"
        class="btn btn-outline-success"
        @click="
          $router.push(
            `/auth/user/${$store.state.user.id}/posts/edit/${postData._id}`
          )
        "
      >
        Editer
      </button>
      <button type="button" class="comment" @click="showFormComment">
        Commenter
      </button>
    </div>
    <div class="header-title">
      <span class="title">{{ postData.title || "inconnu" }}</span>
      <span class="author">par {{ author || "inconnu" }}</span>
      <span class="likes">{{ postData.likes || 0 }} likes</span>
    </div>
    <hr />
    <img
      :src="postData.image"
      alt="image du post"
      v-if="postData.image !== ''"
    />
    <p>
      {{ postData.body || "pas de contenu " }}
    </p>
    <hr class="bottom" />
    <!-- <div class="comments" v-for="comment in comments" key="comment"></div> -->
    <div class="add-comment">
      <form @submit.prevent="submitComment">
        <textarea
          type="text"
          v-validate="'required'"
          name="comment"
          class="form-control"
          v-model.trim="newComment"
          v-show="formVisible"
        />
        <span
          v-if="(submitted && errors.has('nom')) || errors.has('nom')"
          class="errorNotification"
          >{{ errors.first("nom") }}</span
        >
        <button class="addComment" type="submit">
          envoyer<svg
            width="24"
            height="24"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="button-icon"
          >
            <path
              d="M8 12H16M16 12L12.5 8.5M16 12L12.5 15.5"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
    <router-link :to="'/auth/user/profil/home'"
      >Retourner vers page d'acceuil</router-link
    >
  </div>
</template>

<script>
import CommentCard from "@/components/CommentCard.vue";

export default {
  name: "PostPage",
  component: { CommentCard },
  data() {
    return {
      formVisible: false,
      postData: {},
      comments: [],
      newComment: "",
      submitted: false,
    };
  },
  computed: {
    convertDate() {
      const date = new Date(this.postData.CreatedAt).toLocaleDateString();
      return date;
    },
    author() {
      const fullname = `${this.$store.state.user.prenom}  ${this.$store.state.user.nom}`;
      return fullname;
    },
  },
  methods: {
    date() {
      const [year, month, day] =
        this.postData.CreatedAt.split("T")[0].split("-");
      new Date(+year, month - 1, +day).toLocaleDateString("fr");
    },
    showFormComment() {
      this.formVisible = !this.formVisible;
    },
    submitComment() {
      console.log("form submitted");
      this.submitted = true;
      // trigger validation once the user submits the form
      this.$validator.validate().then((isValid) => {
        console.log("Validation Form Add Comment: ", isValid);
        if (isValid) {
          let token = this.$store.getters.getToken;

          this.$store
            .dispatch("addComment", {
              data: this.newComment,
              postId: this.postData._id,
              token: token,
            })
            .then((res) => {
              console.log(res);
              this.message = res.data.message;
              this.successful = res.data.success;
            });
        }
      });
    },
    deletePost() {
      this.$store.dispatch("deletePost", {
        postId: this.postData._id,
        token: this.$store.getters.getToken,
      });
    },
  },
  mounted() {
    this.postData = this.$store.getters.getPostSpec(this.$route.params.postId);
  },
};
</script>

<style scoped>
.post {
  padding: 54px 71px 0 79px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 129px;
  height: 34px;
  color: white;
  border-radius: 30px;
}
.date {
  background: #444444;
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
}
.header-title {
  display: flex;
  flex-direction: column;
}
.title {
  font-family: Inter;
  font-weight: Bold;
  font-size: 20px;
}
.author {
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  color: #0085ff;
}
.likes {
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  color: #545454;
}
img {
  max-width: 100%;
  height: auto;
  margin: 41px 0;
}
hr.bottom {
  margin: 34px 0;
}
.add-comment {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
textarea {
  width: 415px;
  height: 140px;
  border-radius: 30px;
  background: #0085ff;
  color: white;
  padding: 15px;
}
a {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.comment {
  background: #0085ff;
  color: white;
  font-family: Inter;
  font-weight: Bold;
  font-size: 16px;
  border-radius: 30px;
}
button.comment {
  width: 129px;
  height: 34px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0085ff;
  cursor: pointer;
}
button:focus {
  outline: none;
}
.addComment {
  display: flex;
  align-items: center;
  border: none;
  background: none;
  color: #0085ff;
  cursor: pointer;
}
#button-icon {
  width: 20px;
  height: 20px;
  margin-left: 2.5px;
}
.errorNotification {
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding: 15px;
  color: red;
}
</style>