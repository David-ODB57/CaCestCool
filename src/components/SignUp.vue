<template>
  <div class="container">
    <img :src="require('../assets/images/logo.png')" alt="logo" />
    <form>
      <input
        v-model.trim="email"
        @input="checkEmail"
        placeholder="Email"
        type="email"
        name="email"
        required
      />
      <input
        v-model.trim="password"
        placeholder="Mot de passe"
        type="password"
        name="password"
      />
      <input
        v-model.trim="password"
        placeholder="Confirmer le mot de passe"
        type="password"
        name="confirmation"
      />
    </form>
    <button @submit="onSubmit">S'enregister</button>
    <router-link :to="'/login'">Vous avez déjà un compte ?</router-link>
  </div>
</template>

<script>
export default {
  name: "TheForm",
  data() {
    return {
      email: null,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      this.email = "";
    },
    // checkEmail() {
    //   const regExp =
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (!regExp.test(this.email) && this.email !== "") {}
    // }
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
