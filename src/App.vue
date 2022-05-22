<template>
  <div id="app">
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
/* body {
  min-height: 100vh;
  background: url("./assets/images/bg.webp") no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background: #ededed;
} */
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Inter";
  font-style: normal;
  min-height: 100vh;
  background: url("./assets/images/bg.webp") no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
