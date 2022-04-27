<template>
  <div class="container">
    <img :src="require('../assets/images/logo.png')" alt="logo" />
    <form>
      <input
        v-model.trim="form.name"
        placeholder="name"
        type="text"
        name="name"
        required
      />
      <input
        v-model.trim="form.email"
        @input="checkEmail"
        placeholder="Email"
        type="email"
        name="email"
        required
      />
      <!-- <span v-if="errors" class="errorNotification">{{ errors }}</span> -->
      <input
        v-model.trim="form.password"
        placeholder="Mot de passe"
        type="password"
        name="password"
        required
      />
      <input
        v-model.trim="pwd_confirmation"
        placeholder="Confirmer le mot de passe"
        type="password"
        name="pwd_confirmation"
        required
      />
    </form>
    <button @click="checkForm">S'enregister</button>
    <router-link :to="'/login'">Vous avez déjà un compte ?</router-link>
  </div>
</template>

<script>
export default {
  name: "TheForm",
  data() {
    return {
      errors: [],
      form: {
        name: null,
        email: null,
        password: null,
      },
      pwd_confirmation: null,
    };
  },
  methods: {
    checkForm() {
      this.checkEmail && this.form.password && this.pwd_confirmation
        ? true
        : this.errors.push("Email invalide");
      this.errors = [];
      if (!this.form.password) this.errors.push("Un mot de passe est requis");
      if (this.form.password !== this.pwd_confirmation)
        this.errors.push("Les mots de passe ne correspondent pas");
    },
    checkEmail() {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(this.form.email);
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
::placeholder {
  color: hsla(0, 0%, 72%, 1);
}
button {
  width: 220px;
  height: 50px;
  color: #ffffff;
  background: #0085ff;
  border-radius: 30px;
  font-weight: 700;
  font-size: 16px;
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
</style>
