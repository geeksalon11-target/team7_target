<template>
  <!-- 企業詳細ページ -->
  <section id="CoPage">
    <div class="CoPage_container">
      <h1 class="page_title">{{ resultName }}</h1>
      <span v-on:click="LikeFunction()">
        <span class="star1" v-if="liked">★</span>
        <span class="star2" v-else>☆</span>
      </span>
      <div v-for="corporation in coResults" v-bind:key="corporation.id">
        <h3>業種</h3>
        <div
          v-for="serviceCategory in corporation.serviceCategories"
          v-bind:key="serviceCategory.id"
        >
          <div
            v-for="serviceKind in serviceCategory.serviceKinds"
            v-bind:key="serviceKind.id"
          >
            <p>
              <span> {{ serviceKind.name }}:</span>
              <span
                v-for="service in serviceKind.services"
                v-bind:key="service.id"
              >
                {{ service.name }}&nbsp;
              </span>
            </p>
          </div>
        </div>

        <h2>企業紹介</h2>
        <p>{{ corporation.profile }}</p>
        <h2>企業実績</h2>
        <p>{{ corporation.businessResults }}</p>
        <h2>会社データ</h2>

        <h3>会社名</h3>

        <p>{{ corporation.name }}</p>

        <h3>設立日</h3>

        <p>{{ corporation.foundationDate }}</p>

        <h3>資本金</h3>

        <p>{{ corporation.capital }}円</p>

        <h3>本店所在地</h3>

        <p>{{ corporation.location.address }}</p>

        <h3>ホームページ</h3>

        <a v-bind:href="corporation.url">{{ corporation.url }}</a>

        <p class="lastUpdateTime">
          ※最終更新日：{{ corporation.lastUpdateTime }}
        </p>
      </div>
    </div>
  </section>
</template>

<script
  src="https://kit.fontawesome.com/1987eb875f.js"
  crossorigin="anonymous"
></script>
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
            if (this.resultId == doc.data().likeCorp[i].Corpid) {
              this.liked = true;
            }
          }
        });
    },
    returnUserData() {
      // いいねの付けはずし
      if (this.liked) {
        console.log("true");
        this.userData.likeCorp.push({
          Corpid: this.resultId,
          Corpname: this.resultName,
          Corpkana: this.resultKana,
        });
        alert("お気に入りに登録しました！");
      } else {
        console.log("false");
        for (let i = 0; i < this.userData.likeCorp.length; i++) {
          if (this.resultId == this.userData.likeCorp[i].Corpid) {
            this.userData.likeCorp.splice(i, 1);
          }
        }
      }
      // if (this.initialLength == this.userData.likeCorp.length) {
      //   return false;
      // }
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

<style></style>
