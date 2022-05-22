<template>
  <div class="wall-infos">
    <h1>Mon Compte</h1>
    <hr />
    <div class="form-container">
      <form @keyup.enter="updateUserId" @submit.prevent="updateUserId">
        <div class="info form-group">
          <label for="nom">Nom</label>
          <input
            class="form-control"
            v-model.trim="user.nom"
            v-validate="'alpha_spaces'"
            :placeholder="lastName"
            type="text"
            name="nom"
          />
          <span
            v-if="(submitted && errors.has('nom')) || errors.has('nom')"
            class="errorNotification"
            >{{ errors.first("nom") }}</span
          >
        </div>
        <div class="info form-group">
          <label for="prenom">Prenom</label>
          <input
            class="form-control"
            v-model.trim="user.prenom"
            v-validate="'alpha_dash'"
            :placeholder="firstName"
            type="text"
            name="prenom"
          />
          <span
            v-if="(submitted && errors.has('prenom')) || errors.has('prenom')"
            class="errorNotification"
            >{{ errors.first("prenom") }}</span
          >
        </div>
        <div class="info">
          <label for="nom">Email</label>
          <input
            class="form-control"
            v-model.trim="user.email"
            v-validate="{ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }"
            :placeholder="email"
            type="email"
            name="email"
          />
          <span
            v-if="(submitted && errors.has('email')) || errors.has('email')"
            class="errorNotification"
            >{{ errors.first("email") }}</span
          >
        </div>
        <div class="form-group">
          <button
            :disabled="
              errors.any() || (!user.nom && !user.prenom && !user.email)
            "
            type="submit"
            class="btn btn-outline-primary"
          >
            Modifier
          </button>
        </div>
      </form>

      <form @keyup.enter="updateUserPwd" @submit.prevent="updateUserPwd">
        <div class="info form-group">
          <label for="password">Changer mot de passe</label>
          <div class="info password">
            <input
              v-if="!showPassword"
              class="form-control password"
              v-model.trim="password"
              type="password"
              name="password"
              ref="password"
            />
            <input
              v-else
              class="form-control password"
              v-model.trim="password"
              type="text"
              name="password"
              ref="password"
            />
            <i
              :class="{
                'bi bi-eye-slash': !showPassword,
                'bi bi-eye-fill': showPassword,
              }"
              class="blue-color"
              @click="toggleVisibility"
            ></i>
          </div>
          <div class="info form-group">
            <input
              class="form-control"
              v-model.trim="pwd_confirmation"
              v-validate="'confirmed:password'"
              data-vv-as="de confirmation"
              placeholder="Confirmer le mot de passe"
              type="password"
              name="pwd_confirmation"
            />
            <span
              v-if="
                (submitted && errors.has('pwd_confirmation')) ||
                errors.has('pwd_confirmation')
              "
              class="errorNotification"
              >{{ errors.first("pwd_confirmation") }}</span
            >
          </div>
        </div>
        <div class="form-group">
          <button
            :disabled="errors.any() || !pwd_confirmation"
            type="submit"
            class="btn btn-outline-primary"
          >
            Modifier
          </button>
        </div>
      </form>

      <form @keyup.enter="updateUserAvatar" @submit.prevent="updateUserAvatar">
        <div class="info form-group">
          <label for="avatar">Avatar</label>
          <input
            class="form-control-file"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            v-validate="'image|size:2050|mimes:image/png,image/jpeg,image/jpg'"
            name="avatar"
            @change="onSelect"
          />
          <span v-if="errors.has('avatar')" class="errorNotification">{{
            errors.first("avatar")
          }}</span>
        </div>
        <div class="form-group">
          <button
            :disabled="errors.any() || !avatar"
            type="submit"
            class="btn btn-outline-primary"
          >
            Modifier
          </button>
        </div>
      </form>
      <div
        v-if="message"
        :class="successful ? 'successNotification' : 'errorNotification'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyProfilAccount",
  data() {
    return {
      user: {
        nom: null,
        prenom: null,
        email: null,
      },
      password: null,
      pwd_confirmation: null,
      avatar: null,
      showPassword: false,
      submitted: false,
      successful: false,
      message: null,
    };
  },
  computed: {
    ...mapGetters({
      firstName: "getUserFirstName",
      lastName: "getUserLastName",
      email: "getUserEmail",
      token: "getToken",
    }),
  },
  methods: {
    onSelect(evt) {
      const file = evt.target.files[0];
      this.avatar = file;
      console.log(this.avatar);
    },

    toggleVisibility() {
      this.showPassword = !this.showPassword;
    },

    updateUserAvatar() {
      this.message = "";
      this.submitted = true;
      // trigger validation once the user submits the form
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          let token = this.token;
          let formData = new FormData();

          formData.append("avatar", this.avatar, this.avatar.name);

          this.$store
            .dispatch("updateUserAvatar", {
              data: formData,
              token: token,
            })
            .then((res) => {
              this.message = res.data.message;
              this.successful = res.data.success;
            });
        }
      });
    },
    updateUserId() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          const token = this.token;
          let idsToUpdate = { ...this.user };

          //Suppression des champs non renseignés
          for (const key in idsToUpdate) {
            if (idsToUpdate[key] === null) delete idsToUpdate[key];
          }
          this.$store
            .dispatch("updateUserIds", {
              data: idsToUpdate,
              token: token,
            })
            .then((res) => {
              this.message = res.data.message;
              this.successful = res.data.success;
            });
        }
      });
    },
    updateUserPwd() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          const token = this.token;
          const newPwd = this.password;

          this.$store
            .dispatch("updateUserPwd", {
              data: newPwd,
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&family=Timmana&display=swap");

.wall-infos {
  width: 100%;
  margin: 132px 67px 0 67px;
}
h1 {
  font-family: "Timmana", sans-serif;
  font-weight: 400;
  font-size: 36px;
  color: hsla(0, 0%, 51%, 1);
}
hr {
  border: 1px solid #dddddd;
  margin: 23px 0 41px;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form {
  min-width: 39vw;
  margin: 30px 0;
}
.info {
  max-width: 25vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
label {
  font-weight: 700;
}

.info.password {
  flex-direction: row;
  align-items: center;
}
.form-control.password {
  border-top: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
i {
  padding: 0 7px;
  font-size: 24px;
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.blue-color {
  color: #0085ff;
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