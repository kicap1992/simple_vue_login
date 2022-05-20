<template>
  <form @submit.prevent="loginHandler">
    <h3>Login</h3>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        v-model="email"
        placeholder="Enter email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="Enter password"
        required
      />
    </div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginHandler() {
      console.log("loginHandler");
      try {
        // create a axios get request to the server
        const response = await axios.get("api/login", {
          params: {
            username: this.email,
            password: this.password,
          },
        });
        // console.log(response);
        const responseData = response.data;
        localStorage.setItem("token", responseData.accessToken);
        alert("Login Successful");
        this.$router.push("/private");
      } catch (e) {
        // console.log(e);
        const error = e.response.data.message;
        alert(error);
      }
    },
  },
};
</script>
