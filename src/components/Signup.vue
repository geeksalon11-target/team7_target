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
        <td><input type="text" v-model="name" /></td>
      </tr>
      <tr>
        <th>志望職種：</th>
      </tr>
      <tr>
        <td><input type="text" v-model="syokusyu" /></td>
      </tr>
      <tr>
        <th>志望業種：</th>
      </tr>
      <tr>
        <td><input type="text" v-model="gyousyu" /></td>
      </tr>
      <tr>
        <th>お住まいの地域：</th>
      </tr>
      <tr>
        <td><input type="text" v-model="area" /></td>
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
                likeCorp: [],
                area: this.area,
                occupation: this.syokusyu,
                industry: this.gyousyu,
              });
          }
        )
        .then(() => {
          this.$router.push("/");
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
