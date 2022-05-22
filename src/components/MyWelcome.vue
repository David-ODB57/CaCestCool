<template>
  <div>
    <h5>
      <b>Bienvenue</b>
      {{ $store.getters.getUserFirstName }}
      !
    </h5>
  </div>
</template>

<script>
export default {
  name: "MyWelcome",
};
</script>

<style scoped>
</style>