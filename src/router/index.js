import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/auth/user/profil",
    component: () => import("../views/MyProfil.vue"),
    children: [
      {
        path: "home",
        component: () => import("../components/MyProfilHome.vue"),
      },
    ],
  },
  {
    path: "/auth/user/:userId/posts/:postId",
    component: () => import("../views/PostPage.vue"),
  },
  {
    path: "/auth/user/posts/add",
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/auth/user/:userId/posts/edit/:postId",
    component: () => import("../views/EditPost.vue"),
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }

  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err;
    }

    return Promise.reject(err);
  });
};

<<<<<<< HEAD
// router.beforeEach((to, from, next) => {
//   //  redirige vers la page de login si l'utilisateur n'est pas connecté
//   // et essaie d'avoir accès à une page necessitant d'être authentifié
//   const publicPages = ["/login", "/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   }

//   next();
// });

=======
>>>>>>> e1b395ba74fde83de08c77e207d8813dc3f500ce
export default router;
