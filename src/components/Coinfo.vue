<template>
  <div class="Coinfo">
    <h1>企業情報検索サイト</h1>
    <div>
      <input
        type="text"
        v-model="keywords"
        placeholder="検索キーワードを入力"
      />
      <button v-on:click="getCompanyNames()">企業を検索する</button>
      <router-link to="/Casearch">条件検索＞</router-link>
      <section id="list__corporations">
        <div v-for="corporation in corporations" v-bind:key="corporation">
          <h3>
            <router-link
              :to="{
                name: 'Copage',
                params: { id: corporation.id },
                query: { name: corporation.name },
              }"
              target="_blank"
            >
              {{ corporation.name }}</router-link
            >
          </h3>

          <div
            v-for="serviceCategory in corporation.serviceCategories"
            v-bind:key="serviceCategory"
          >
            <div
              v-for="serviceKind in serviceCategory.serviceKinds"
              v-bind:key="serviceKind"
            >
              <p>＜{{ serviceKind.name }}＞</p>
            </div>
          </div>

          <p>{{ corporation.location.address }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keywords: "",
      json: "",
      corporations: [],
    };
  },
  methods: {
    getCompanyNames: function () {
      let api =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?keywords=" +
        this.keywords;
      axios.get(api).then((response) => {
        this.corporations = response.data.corporations;
        console.log(response);
      });
    },
  },
};
</script>
