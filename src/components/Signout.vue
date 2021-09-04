<template>
  <div>
    <router-link to="/in" @click="signout">ログアウト</router-link>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    signout: function() {
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
