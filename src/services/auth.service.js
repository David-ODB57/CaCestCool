import axios from "axios";

const url = "http://localhost:3000/auth/";

function login(user) {
  return axios
    .post(`${url}signIn`, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      // console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(localStorage.getItem("user"));
      }
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("Ooops", err.response.data);
      return err.response.data;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function signUp(user) {
  return axios.post(`${url}signUp`, {
    email: user.email,
    password: user.password,
  });
}

function getAllPosts(user) {
  return axios
    .get(`${url}posts`, {
      headers: {
        Authorization: `bearer ${user.accessToken}`,
      },
    })
    .then((response) => {
      console.table(response);
    })
    .catch((err) => {
      // console.log("Ooops", err.response.data);
      return err.response.data;
    });
}

export default { login, logout, signUp, getAllPosts };
