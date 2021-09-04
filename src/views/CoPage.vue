<template>
  <!-- 企業詳細ページ -->
  <div>
    <section>
      <span v-on:click="LikeFunction()">
        <span v-if="liked">★</span>
        <span v-else>☆</span>
      </span>
      <h2>{{ resultName }}</h2>
      <div v-for="corporation in coResults" v-bind:key="corporation.id">
        <h4>業種</h4>
        <div
          v-for="serviceCategory in corporation.serviceCategories"
          v-bind:key="serviceCategory.id"
        >
          <div
            v-for="serviceKind in serviceCategory.serviceKinds"
            v-bind:key="serviceKind.id"
          >
            <p>
              <span> {{ serviceKind.name }}<br /></span>
              <span
                v-for="service in serviceKind.services"
                v-bind:key="service.id"
              >
                {{ service.name }}/
              </span>
            </p>
          </div>
        </div>
        <h4>本社</h4>
        <p>{{ corporation.location.address }}</p>

        <h3>企業紹介</h3>
        <p>{{ corporation.profile }}</p>
        <h3>企業実績</h3>
        <p>{{ corporation.businessResults }}</p>

        <a v-bind:href="corporation.url">{{ corporation.url }}</a>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["id"],
  data() {
    return {
      corporations: [],
      resultName: this.$route.query.name,
      resultKana: this.$route.query.nameKana,
      resultId: this.$route.params.id,
      userData: [],
      liked: false,
      initialLength: 0,
      userID: "",
    };
  },
  created: async function () {
    // firebase get
    this.getUserID();
    this.getCorp();
  },
  methods: {
    LikeFunction: function () {
      this.liked = !this.liked;
      this.returnUserData();
    },
    getUserID: function () {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // ログインしていれば中通る
          this.userID = user.uid;
          this.getUser(user.uid);
        }
        // 登録解除
        unsubscribe();
      });
    },
    getCorp: function () {
      // 企業名で絞込
      this.axios
        .get(
          "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&keywords=" +
            this.resultKana
        )
        .then((response) => {
          this.corporations = response.data.corporations;
        })
        .catch((error) => console.log(error));
    },
    getUser: async function (userID) {
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
          this.userData = doc.data();
          // 初期のいいねした企業数を保存
          this.initialLength = doc.data().likeCorp.length;
          for (let i = 0; i < doc.data().likeCorp.length; i++) {
            if (this.resultId == doc.data().likeCorp[i]) {
              this.LikeFunction();
            }
          }
        });
    },
    returnUserData: function () {
      // いいねの付けはずし
      if (this.liked) {
        this.userData.likeCorp.push(this.resultId);
      } else {
        console.log("false");
        for (let i = 0; i < this.userData.likeCorp.length; i++) {
          if (this.resultId == this.userData.likeCorp[i]) {
            this.userData.likeCorp.splice(i, 1);
          }
        }
      }
      if (this.initialLength == this.userData.likeCorp.length) {
        return false;
      }
      // firestore
      firebase
        .firestore()
        .collection("users")
        .doc(this.userID)
        .set(this.userData);
    },
  },
  computed: {
    // 企業IDを照会
    coResults() {
      const data = this.corporations;
      const result = data.filter((value) => value.id === this.resultId);
      return result;
    },
  },
};
</script>

<style>
.span {
  color: yellow;
}
</style>
