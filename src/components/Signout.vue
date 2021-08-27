<template>
  <button @click="signout">ログアウト</button>
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
