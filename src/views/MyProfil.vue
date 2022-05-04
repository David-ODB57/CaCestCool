<template>
  <div class="wall-content">
    <my-wall-menu></my-wall-menu>
    <my-wall-page></my-wall-page>
  </div>
</template>

<script>
import MyWallMenu from "@/components/MyWallMenu.vue";
import MyWallPage from "@/components/MyWallPage.vue";

export default {
  name: "MyProfil",
  components: { MyWallMenu, MyWallPage },
};
</script>

<style>
.wall-content {
  display: flex;
  min-height: 100vh;
}
</style>