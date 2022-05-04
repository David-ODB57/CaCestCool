<template>
  <div class="form-add-post">
    <h1>Ajouter un post</h1>
    <form @keyup="onSubmit" @submit="onSubmit">
      <div class="field">
        <label for="title">Titre</label>
        <input type="text" name="title" />
      </div>
      <div class="field">
        <label for="content">Auteur</label>
        <input type="text" name="author" />
      </div>
      <div class="field">
        <label for="content">Contenu</label>
        <textarea
          class="input-area"
          name="content"
          :value="value"
          @input="update"
        ></textarea>
      </div>
      <div class="field">
        <label for="content">Image</label>
        <input type="file" name="image" />
      </div>
      <button type="submit">ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: "",
      title: "",
      body: "",
      image: "",
      message: "",
    };
  },
};
</script>

<style>
.form-add-post {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
label {
  margin-bottom: 5px;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 700;
}
.input-area {
  outline: none;
  border: 1px solid #d8d8d8;
  box-shadow: none;
  border-radius: 0;
  background-color: #ffffff;
  height: 150px;
  flex-grow: 1;
  padding: 10px;
  font-family: inherit;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 300;
  height: 200px;
  color: #000000;
  letter-spacing: 1px;
  overflow: hidden;
  overflow-y: scroll;
  resize: none;
}
button {
  max-width: 100px;
  padding: 5px;
  margin-top: 15px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid #4a7dff;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}
button:hover {
  background: #4a7dff;
}
</style>