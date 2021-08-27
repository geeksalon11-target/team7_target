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
        <ul>
          <li v-for="(corporation, key) in corporations" :key="key">
            <a v-bind:href="corporation.url" target="_blank">
              {{corporation.name}}
            </a>
          </li>
        </ul>
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
      corporations:[]
    }
  },
  methods: {
    getCompanyNames: function () {
        let api="https://u10sme-api.smrj.go.jp/v1/corporations.json?keywords=" + this.keywords;
        axios
        .get(api)
        .then(response => {
        this.corporations = response.data.corporations
        console.log(response)
        });
    }
}
}
</script>