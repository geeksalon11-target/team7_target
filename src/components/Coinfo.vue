<template>
  <div id="Coinfo">
    <div>
      <div class="input_keywords">
        <input
          type="text"
          v-model="keywords"
          placeholder="検索キーワードを入力"
        />
        <button v-on:click="getCompanyNames()">企業を検索する</button>
      </div>

      <section id="list__corporations" v-if="clickedKensaku">
        <div class="list_corporation">
          <p class="searchWord">
            <span>🔍「{{ searchWord }}」&nbsp;検索結果</span>
          </p>
          <p>全{{ corporations.length }}件/{{ currentPage }}ページ目</p>
        </div>
        <div
          class="list_corporation"
          v-for="corporation in getCorporations"
          v-bind:key="corporation"
        >
          <router-link
            :to="{
              name: 'Copage',
              params: { id: corporation.id },
              query: {
                name: corporation.name,
                nameKana: corporation.nameKana,
              },
            }"
            target="_blank"
          >
            <h3>{{ corporation.name }}</h3></router-link
          >
          <div class="serviceCategory">
            <p class="tag">業種</p>
            <div
              v-for="serviceCategory in corporation.serviceCategories"
              v-bind:key="serviceCategory"
            >
              <ul
                v-for="serviceKind in serviceCategory.serviceKinds"
                v-bind:key="serviceKind"
              >
                <li>{{ serviceKind.name }}&nbsp;</li>
              </ul>
            </div>
          </div>

          <p><span class="tag">本社</span>{{ corporation.location.address }}</p>
        </div>

        <paginate
          :page-count="getPageCount"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'＜'"
          :next-text="'＞'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :active-class="'current'"
        >
        </paginate>
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
      searchWord: "",
      parPage: 10,
      currentPage: 1,
      clickedKensaku: false,
      corporations: [],
    };
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
      let api =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&keywords=" +
        this.keywords;
      axios.get(api).then((response) => {
        this.corporations = response.data.corporations;
        console.log(response);
      });
      this.searchWord = this.keywords;
      this.clickedKensaku = true;
    },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
  computed: {
    getCorporations() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.corporations.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.corporations.length / this.parPage);
    },
  },
};
</script>
<style></style>
