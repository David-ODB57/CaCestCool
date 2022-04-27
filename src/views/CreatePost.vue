<template>
  <textarea class="input-area" :value="value" @input="update"></textarea>
</template>

<script>
import axios from "axios";

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
</style>