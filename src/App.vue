<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Signup />
    <Signin />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Signup from "./components/Signup.vue";
import Signin from "./components/Signin.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Signup,
    Signin,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
