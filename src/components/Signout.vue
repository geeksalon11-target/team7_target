<template>
  <div>
    <div @click="signout"><router-link to="/in">ログアウト</router-link></div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    signout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Success!");
          // 成功
        })
        .catch(() => {
          alert("エラー");
          // 失敗
        });
    },
  },
};
</script>
