<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* 初期設定解除 */
ul {
  list-style: none;
}
body,
div,
ul,
h1,
h2,
h3,
h4,
p {
  margin: 0;
  padding: 0;
}
/* 共通設定 */
main {
  width: 90%;
  margin: 0 auto;
  height: 100%;
}

body {
  background-color: #eee;
}

/* style.css */
@import "./style.css";
</style>
