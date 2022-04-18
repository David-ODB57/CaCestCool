<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<style>
*,
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  min-height: 100vh;
  background: url("./assets/images/bg.webp") no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Inter";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
