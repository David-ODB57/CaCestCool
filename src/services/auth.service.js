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

function getUserAccount(user) {
  console.table(user);
  return axios
    .get(`${url}user/profil`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((err) => {
      return err;
    });
}

function getAllPosts(user) {
  return axios
    .get(`${url}posts`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
    .then((response) => {
      console.table(response);
      return response;
    })
    .catch((err) => {
      return err;
    });
}

// function getUserPosts(userId) {
//   return null;
// }

export default { login, logout, signUp, getUserAccount, getAllPosts };
