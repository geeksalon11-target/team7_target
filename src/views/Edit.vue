<template>
  <div>
    <tr>
      <th>メールアドレス：</th>
    </tr>
    <tr>
      <td><input type="email" v-model="mail" /></td>
    </tr>
    <tr>
      <th>パスワード：</th>
    </tr>
    <tr>
      <td><input type="password" v-model="password" /></td>
    </tr>
    <button @click="update">変更</button>
    <router-link to="/mypage">戻る</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {},
      mail: "",
      password: "",
    };
  },
  methods: {
    update: function () {
      this.user
        .updateEmail(this.mail)
        .then(() => {
          this.user.updatePassword(this.password);
        })
        .then(() => {
          this.$router.push("/mypage");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser;
      }
      return;
    });
  },
};
</script>
