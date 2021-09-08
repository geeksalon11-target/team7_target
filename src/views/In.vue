<template>
  <div id="In">
    <div v-if="clickedSinki">
      <h3>新規登録</h3>
      <Signup />
      <p v-on:click="backLogin">＜ログイン画面に戻る</p>
    </div>
    <div v-else>
      <h3>ログイン</h3>
      <Signin />
      <p v-on:click="toSinki">アカウントをお持ちでない方はこちら＞</p>
    </div>
  </div>
</template>

<script>
import Signin from "../components/Signin.vue";
import Signup from "../components/Signup.vue";

export default {
  data() {
    return {
      clickedSinki: false,
    };
  },
  components: {
    Signin,
    Signup,
  },
  methods: {
    toSinki() {
      this.clickedSinki = true;
    },
    backLogin() {
      this.clickedSinki = false;
    },
  },
};
</script>
