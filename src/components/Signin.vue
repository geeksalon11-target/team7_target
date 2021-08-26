<template>
  <div class="signin">
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
    </table>

    <button @click="login">ログイン</button>
    <p>
      新しいアカウントを作成しますか？
      <router-link to="/signup">新規登録</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(
          () => {
            alert("成功！！");
          }
          // 成功時の処理
        )
        .catch(
          () => {
            alert("error");
          }
          // エラー時の処理
        );
    },
  },
};
</script>
