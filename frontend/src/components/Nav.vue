<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <a
        href="/"
        class="navbar-brand"
        v-if="$store.state.token == null"
        >Home</a>
      <a
        href="/private"
        class="navbar-brand"
        v-else-if="$store.state.token != null"
        >Home</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          
          <li class="nav-item" v-if="$store.state.token == null">
            <a href="/login" class="nav-link">Login</a>
          </li>
          <li class="nav-item" v-if="$store.state.token != null">
            <a href="/private" class="nav-link">Private</a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nav",
};
</script>
