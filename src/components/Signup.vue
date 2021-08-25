<template>
  <div class="signup">
    <table>
      <tr>
        <th>メールアドレス：</th>
      </tr>
      <tr>
        <td><input type="email" v-model="mailaddress" /></td>
      </tr>
      <tr>
        <th>パスワード：</th>
      </tr>
      <tr>
        <td><input type="password" v-model="password" /></td>
      </tr>
      <tr>
        <th>名前：</th>
      </tr>
      <tr>
        <td><input type="name" v-model="name" /></td>
      </tr>
    </table>

    <button @click="signUp">登録</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailaddress, this.password)
        .then(
          // 成功時の処理
          (userCredential) => {
            firebase
              .firestore()
              .collection("users")
              .doc(userCredential.user.uid)
              .set({
                name: this.name,
              });
          }
        )
        .then(() => {
          alert("成功！！");
        })
        .catch(
          // エラー時の処理
          () => {
            alert("エラー");
          }
        );
    },
  },
};
</script>
