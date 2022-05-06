<template>
  <div class="wall-content">
    <my-wall-menu></my-wall-menu>
    <my-account></my-account>
  </div>
</template>

<script>
import MyWallMenu from "@/components/MyWallMenu.vue";
import MyAccount from "@/components/MyAccount.vue";

export default {
  name: "MyProfil",
  components: { MyWallMenu, MyAccount },
};
</script>

<style>
.wall-content {
  display: flex;
  min-height: 100vh;
}
</style>