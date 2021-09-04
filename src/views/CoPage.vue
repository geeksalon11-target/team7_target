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
          v-bind:key="serviceCategory"
        >
          <div
            v-for="serviceKind in serviceCategory.serviceKinds"
            v-bind:key="serviceKind"
          >
            <p>
              <span> {{ serviceKind.name }}<br /></span>
              <span
                v-for="service in serviceKind.services"
                v-bind:key="service"
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
      userData:{
        id:"",
        name:"",
        likedCorp:[]
      },
      liked:false,
      initialLength:0
    };
  },
  mounted:function() {
    // 企業名で絞込
    this.axios
      .get(
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&keywords=" +
          this.resultKana
      )
      .then((response) => (this.corporations = response.data.corporations))
      .catch((error) => console.log(error));
    // firebase get
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        for (let i = 0; i < snapshot.docs.length; i++) {
          this.user.push(snapshot.docs[i].data())
        }
      })
    // 初期のいいねした企業数を保存
    this.initialLength = this.userData.likedCorp.length
  },
  methods:{
    LikeFunction:function(){
      this.liked=!this.liked
    }
  },
  created:function(){
    for (let i = 0; i < this.userData.likedCorp.length; i++) {
      if(this.resultId == this.userData.likedCorp[i]){
        console.log('aaa')
        this.LikeFunction()
      }
    }
  },
  computed: {
    // 企業IDを照会
    coResults() {
      const data = this.corporations;
      const result = data.filter((value) => value.id === this.resultId);
      return result;
    },
  },
  destroyed:function(){
    // いいねの付けはずし
    if (this.initialLength == this.userData.likedCorp.length) {
      return false
    }
    else if(this.liked){
      this.userData.likedCorp.append(this.resultId)
    }else {
      for (let i = 0; i < this.userData.likedCorp.length; i++) {
      if(this.resultId == this.userData.likedCorp[i]){
        this.userData.likedCorp.splice(i,1)
      }
     }
    }
    // firestore
    firebase
      .firestore
      .collection('user')
      .doc(this.userData.id)
      .set(this.userData)
  }
};
</script>

<style>
  li span.star{
    color: yellow;
  }
</style>
