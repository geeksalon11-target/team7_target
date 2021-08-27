<template>
  <div class="Coinfo">
    <h1>企業情報検索サイト</h1>
      <div>
        検索ワード<input type="text" v-model="keywords" placeholder="検索キーワードを入力"/>
        <button v-on:click="getCompanyNames()">企業を検索する</button>
        <p>{{json}}</p>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keywords:"",
      json:""
    }
  },
  methods: {
    getCompanyNames: function () {
        let url="https://u10sme-api.smrj.go.jp/v1/corporations.json?keywords=" + this.keywords;
        axios
        .get(url)
        .then(response => {
        this.json = response["data"]
        });
    }
}
}
</script>