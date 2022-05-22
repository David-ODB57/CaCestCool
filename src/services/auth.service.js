import axios from "axios";

const url = "http://localhost:3000/";
const authUrl = "http://localhost:3000/auth/";

async function login(userData) {
  try {
    const user = await axios.post(`${url}signIn`, {
      email: userData.email,
      password: userData.password,
    });
    console.log(user.data);
    if (user.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(user.data));
    }
    return user.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("allPosts");
  localStorage.removeItem("userPosts");
}

function signUp(user) {
  return axios.post(`${url}signUp`, {
    email: user.email,
    password: user.password,
  });
}

async function getUserAccount(user) {
  console.log("user Profil", user);
  try {
    const response = await axios.get(`${authUrl}user/profil`, {
      headers: {
        authorization: `bearer ${user.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
}

async function updateUserProfilAvatar(updates) {
  const form = updates.data;
  const token = updates.token;
  const avatarUrl = "user/profil/avatar";
  const hearderAvatar = "'Content-Type': 'multipart/form-data'";

  try {
    const response = await axios.put(`${authUrl}${avatarUrl}`, form, {
      headers: {
        authorization: `bearer ${token}`,
        hearderAvatar,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

async function updateUserProfilIds(updates) {
  const form = updates.data;
  const token = updates.token;
  const idsUrl = "user/profil/ids";

  try {
    const response = await axios.put(`${authUrl}${idsUrl}`, form, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

async function userUpdateProfilPwd(updates) {
  const password = { password: updates.data };
  const token = updates.token;
  const pwdUrl = "user/profil/pwd";

  try {
    const response = await axios.put(`${authUrl}${pwdUrl}`, password, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

async function addOneLike(data) {
  const ids = data.ids;
  const token = data.token;
  const pwdUrl = "posts/likes";

  try {
    const response = await axios.put(`${authUrl}${pwdUrl}`, ids, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

async function getAllPosts(token) {
  try {
    const response = await axios.get(`${authUrl}posts`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    localStorage.setItem("allPosts", JSON.stringify(response.data));
    return response;
  } catch (err) {
    return err.response;
  }
}

async function getUserPosts(userId, token) {
  try {
    const response = await axios.get(`${authUrl}posts/${userId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    localStorage.setItem("userPosts", JSON.stringify(response.data));
    return response;
  } catch (err) {
    return err.response;
  }
}

async function newPost(form, token) {
  try {
    const response = await axios.post(`${authUrl}user/posts/add`, form, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

async function editPost(form, postId, token) {
  console.log(form);
  console.log(postId);
  console.log(token);
  try {
    const response = await axios.put(
      `${authUrl}user/posts/edit/${postId}`,
      form,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
}

async function deletePost(postId, token) {
  try {
    const response = await axios.delete(
      `${authUrl}user/posts/delete/${postId}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

async function newComment(comment, token) {
  try {
    const response = await axios.post(`${authUrl}user/comment`, comment, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

export default {
  login,
  logout,
  signUp,
  getUserAccount,
  updateUserProfilAvatar,
  updateUserProfilIds,
  userUpdateProfilPwd,
  addOneLike,
  getAllPosts,
  getUserPosts,
  newPost,
  editPost,
  deletePost,
  newComment,
};
