<template>
  <div class="Coinfo">
    <h1>企業情報検索サイト</h1>
      <div>
        <input type="text" v-model="keywords" placeholder="検索キーワードを入力"/>
        <button v-on:click="getCompanyNames()">企業を検索する</button>
        <!-- <p>{{json}}</p> -->
        <!-- <ul v-for="corporation in corporations" v-bind:key="corporation">
          <h3>{{corporation.name}}</h3>
        </ul> -->
        <!-- <ul>
          <li v-for="(corporation, key) in corporations" :key="key">
            <a v-bind:href="corporation.url" target="_blank">
              {{corporation.name}}
            </a>
          <div v-for="industry in industries" v-bind:key="industry">
            <a>{{industry.name}}</a>
          </div>
          <div v-for="area in areas" v-bind:key="area">
            <a>{{area.name}}</a>
          </div>
          </li>
        </ul>
      </div>
  </div> -->
      <div v-for="corporation in corporations" v-bind:key="corporation">
        <h3>
          <router-link to="/CPage" v-on:click="toCPage(corporation.id)">{{
            corporation.name
          }}</router-link>
        </h3>
        <div v-for="serviceCategory in corporation.serviceCategories" v-bind:key="serviceCategory">
          <div v-for="serviceKind in serviceCategory.serviceKinds" v-bind:key="serviceKind">
            <p>＜{{ serviceKind.name }}＞</p>
          </div>
        </div>
        <p>{{ corporation.location.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keywords:"",
      json:"",
      corporations:[],
      industries:[],
      areas:[]
    }
  },
  mounted() {
    // 職種&地域検索用APIの取得
    this.axios
      .get("https://u10sme-api.smrj.go.jp/v1/serviceCategories.json")
      .then((response) => (this.industries = response.data.serviceCategories))
      .catch((error) => console.log(error));
    this.axios
      .get("https://u10sme-api.smrj.go.jp/v1/areas.json")
      .then((response) => (this.areas = response.data.areas))
      .catch((error) => console.log(error));
  },
  methods: {
    getCompanyNames: function () {
        let api="https://u10sme-api.smrj.go.jp/v1/corporations.json?keywords=" + this.keywords;
        axios
        .get(api)
        .then(response => {
        this.corporations = response.data.corporations
        console.log(response)
        })
        // axios
        // .get("https://u10sme-api.smrj.go.jp/v1/serviceCategories.json")
        // .then(response => {
        // this.industries = response.data.serviceCategories
        // console.log(response);        
        // });
        // axios
        // .get("https://u10sme-api.smrj.go.jp/v1/corporations.json?prefectures=" + this.keywords)
        // .then(response => {
        // this.areas = response.data.prefectures
        // console.log(response);        
        // })
    }
}
}
</script>