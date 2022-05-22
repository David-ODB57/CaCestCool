<template>
  <div class="form-add-post">
    <h1>Editer un post</h1>
    <hr />
    <div class="form-container">
      <div class="image" v-if="postData.image">
        <img :src="postData.image" alt="image du post" />
      </div>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            v-model.trim="title"
            class="form-control"
            type="text"
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="contenu">Contenu</label>
          <textarea
            v-model.trim="body"
            class="form-control"
            name="contenu"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image pour le post</label>
          <input
            @change="onSelect"
            class="form-control-file"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            v-validate="'image|size:2050|mimes:image/png,image/jpeg,image/jpg'"
            name="image"
          />
          <span v-if="errors.has('image')" class="errorNotification">{{
            errors.first("image")
          }}</span>
        </div>
        <button type="submit" class="btn btn-outline-primary">modifier</button>
      </form>
      <div
        v-if="message"
        :class="successful ? 'successNotification' : 'errorNotification'"
      >
        {{ message }}
      </div>
      <router-link :to="'/auth/user/profil/home'"
        >Retourner vers page d'acceuil</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: {},
      title: "",
      body: "",
      image: null,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  methods: {
    onSelect(evt) {
      const file = evt.target.files[0];
      this.image = file;
    },
    onSubmit() {
      this.message = "";
      this.submitted = true;
      // trigger validation once the user submits the form
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          let token = this.$store.getters.getToken;
          let formData = new FormData();

          if (this.image !== null || "") {
            formData.append("title", this.title);
            formData.append("body", this.body);
            formData.append("image", this.image, this.image.name);
          } else {
            formData.append("title", this.title);
            formData.append("body", this.body);
          }

          this.$store
            .dispatch("editPost", {
              data: formData,
              postId: this.$route.params.postId,
              token: token,
            })
            .then((res) => {
              this.message = res.data.message;
              this.successful = res.data.success;
            });
        }
      });
    },
  },
  mounted() {
    this.postData = this.$store.getters.getPostSpec(this.$route.params.postId);
    this.title = this.postData.title;
    this.body = this.postData.body;
  },
};
</script>

<style scoped>
.form-add-post {
  margin: 132px 67px 0 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
h1 {
  font-family: "Timmana", sans-serif;
  font-weight: 400;
  font-size: 36px;
  color: hsla(0, 0%, 51%, 1);
}
hr {
  width: 100%;
  border: 1px solid #dddddd;
  margin: 23px 0 41px;
}
form {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}
label {
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 700;
}
button {
  max-width: 120px;
  padding: 5px;
  margin-top: 15px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.3s;
}
.errorNotification,
.successNotification {
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding: 15px;
}
.errorNotification {
  color: red;
}
.successNotification {
  color: green;
}
</style>