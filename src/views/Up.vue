<template>
  <div>
    <Signup />
    <router-link to="/in">アカウントをお持ちの方</router-link>
  </div>
</template>

<script>
import Signup from "../components/Signup.vue";

export default {
  components: {
    Signup,
  },
};
</script>
