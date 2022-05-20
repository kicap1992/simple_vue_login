<template>
  <h3>Private Page</h3>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Private",
  async created() {
    if (localStorage.getItem('token') == 'null') {
      alert("You are not logged in!");
      this.$router.push("/login");
    } else {
      const auth = await this.$store.dispatch("auth");
      console.log(auth);
      if (!auth) {
        alert("You are not logged in!");
        this.$router.push("/login");
      }
    }
  },
};
</script>
