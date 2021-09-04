<template>
  <div>
    <Signin />
    <router-link to="/up" @click="signup">新規登録</router-link>
  </div>
</template>

<script>
import Signin from "../components/Signin.vue";

export default {
  components: {
    Signin,
  },
};
</script>
