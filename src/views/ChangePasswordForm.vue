<template>
  <form @keyup.enter="checkPwdForm" @submit.prevent="checkPwdForm">
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
    <button type="submit">Valider</button>
    <p>{{ form.password }}</p>
  </form>
</template>

<script>
export default {
  name: "ChangePasswordForm",
  data() {
    return {
      form: {
        password: null,
      },
      pwd_confirmation: null,
      submitted: false,
      successful: false,
      message: "",
    };
  },

  methods: {
    checkPwdForm() {
      console.log("verif FORM");
      this.message = "";
      this.submitted = true;
      // trigger validation once the user submits the form
      this.$validator.validate().then((isValid) => {
        console.log(isValid);
        if (isValid) {
          this.$store.dispatch("changePassword", this.form).then(
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

<style>
.errorNotification {
  color: red;
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding: 15px;
}
</style>