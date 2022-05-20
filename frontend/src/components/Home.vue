<template>
  <h3>Home</h3>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    async created () {
      if (localStorage.getItem('token') != 'null') {
        const auth = await this.$store.dispatch('auth');
        console.log(auth)
        if (auth) {
          this.$router.push('/private');
        }
      }
    }
  }
</script>