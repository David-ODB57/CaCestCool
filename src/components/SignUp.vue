<template>
  <div class="container">
    <img :src="require('../assets/images/logo.svg')" alt="logo" />
    <form @keyup.enter="checkForm()" @submit.prevent="checkForm">
      <input
        v-model.trim="form.email"
        v-validate="{ required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }"
        placeholder="Email"
        type="email"
        name="email"
      />
      <span v-if="submitted && errors.has('email')" class="errorNotification">{{
        errors.first("email")
      }}</span>
      <input
        v-model.trim="form.password"
        v-validate="'required'"
        placeholder="Mot de passe"
        type="password"
        name="password"
        ref="password"
      />
      <span
        v-if="submitted && errors.has('password')"
        class="errorNotification"
        >{{ errors.first("password") }}</span
      >
      <input
        v-model.trim="pwd_confirmation"
        v-validate="'required|confirmed:password'"
        data-vv-as="password"
        placeholder="Confirmer le mot de passe"
        type="password"
        name="pwd_confirmation"
      />
      <span
        v-if="submitted && errors.has('pwd_confirmation')"
        class="errorNotification"
        >{{ errors.first("pwd_confirmation") }}</span
      >
      <button type="submit">S'enregister</button>
    </form>
    <div v-if="message" class="errorNotification">
      {{ message }}
    </div>
    <router-link :to="'/login'">Vous avez déjà un compte ?</router-link>
  </div>
</template>

<script>
export default {
  name: "TheForm",
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      pwd_confirmation: null,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    logged() {
      console.log("verif if logged", this.$store.state.status.logged);
      return this.$store.state.status.logged;
    },
  },
  mounted() {
    if (this.logged) {
      console.log("rediriger vers /user");
      this.$router.push("/user/profil");
    }
  },
  methods: {
    checkForm() {
      console.log("verif FORM");
      this.message = "";
      this.submitted = true;
      // trigger validation once the user submits the form
      this.$validator.validate().then((isValid) => {
        console.log(isValid);
        if (isValid) {
          this.$store.dispatch("signUp", this.form).then(
            (data) => {
              console.log(data);
              this.message = data.message;
              this.successful = data.success;
            },
            (error) => {
              console.log(error);
              this.message = error.message;
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  margin-bottom: 86px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
}
input {
  width: 490px;
  height: 50px;
  background: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  padding-left: 25px;
}
input:focus {
  border: 3px solid #0085ff;
  outline: none;
}
input + input {
  margin-top: 32px;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: hsla(0, 0%, 72%, 1);
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: hsla(0, 0%, 72%, 1);
}
button {
  width: 220px;
  height: 50px;
  color: #ffffff;
  background: #0085ff;
  border-radius: 30px;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  border: none;
  margin-top: 43px;
  cursor: pointer;
  transition: all 0.3s;
}
button:hover {
  letter-spacing: 6px;
}
a {
  margin-top: 33px;
  color: #0084ff;
  text-decoration: none;
}
.errorNotification {
  color: red;
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding: 15px;
}
</style>
