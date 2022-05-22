<template>
  <div class="form-container">
    <!-- A FAIRE ! -->
    <!-- <form @keyup.enter="changePassword" @submit.prevent="changePassword">
      <div class="info form-group">
        <label for="password">Mot de passe</label>
        <div class="info">
          <input
            class="form-control"
            v-model.trim="password"
            placeholder="Mot de passe"
            type="password"
            name="password"
            id="password"
            ref="password"
          />
          <span
            v-if="submitted && errors.has('password')"
            class="errorNotification"
            >{{ errors.first("password") }}</span
          >
        </div>
        <div class="info form-group">
          <input
            class="form-control"
            v-model.trim="pwd_confirmation"
            v-validate="'confirmed:password'"
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
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-outline-primary">Modifier</button>
      </div>
    </form>
    <div v-if="message" class="errorNotification">
      {{ message }}
    </div>
  </div> -->
</template>

<script>
export default {
  name: "FormPwd",
  data() {
    return {
      password: null,
      pwd_confirmation: null,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  methods: {
    changePassword() {
      console.log("Demande update pwd");
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          const token = this.$store.getters.getToken;
          const newPwd = this.password;

          this.$store
            .dispatch("updateUserAccount", {
              password: newPwd,
              token: token,
            })
            .then(
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
</style>