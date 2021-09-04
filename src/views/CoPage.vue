<template>
  <!-- 企業詳細ページ -->
  <div>
    <section>
      <span v-on:click="toggleLiekd()">
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
export default {
  props: ["id"],

  data() {
    return {
      corporations: [],
      resultName: this.$route.query.name,
      resultKana: this.$route.query.nameKana,
      resultId: this.$route.params.id,
      userData: {
        id: 111,
        name: "hoge",
        likedCorop: [1000111, 203444,10003030,111111111],
      },
      liked: false,
    };
  },
  methods:{
    toggleLiekd:function(){
      this.liked = !this.liked
    }
  },
  mounted() {
    // 企業名で絞込
    this.axios
      .get(
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&keywords=" +
          this.resultKana
      )
      .then((response) => (this.corporations = response.data.corporations))
      .catch((error) => console.log(error));
  },
  computed: {
    // 企業IDを照会
    coResults() {
      const data = this.corporations;
      const result = data.filter((value) => value.id === this.resultId);
      return result;
    },
  },
  created:{
    // for(let i = 0 ; i < this.userData.likedCorop.length;i++){
    //   if(this.resultId == this.userData.likedCorop[i]){
    //     this.toggleLiekd()
    //   }
    // }
  },
  destroyed:{
    if(this.liked){
        // いいねした
        // likedCorop にIDを追加する処理
        this.userData.likedCorop.append(resultId)
        // firebase.
        //   .firestore
        //   .collection('user')
        //   .doc(this.userData.id)
        //   .set(this.userData)
      }else{
        // いいね外した
        // likedCorop でIDが一致するものを除外する処理
        for(i=0;i<this.userData.likedCorop.length;i++){
          if(this.resultId == this.userData.likedCorop[i]){
            // 除外するコード
            this.userData.likedCorop.splice(3,1)
          }
        }
      }
  }
};
</script>
