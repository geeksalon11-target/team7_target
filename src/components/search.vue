<template>
  <div id="CategorySearch">
    <!-- 条件検索エリア -->

    <section id="list__categories">
      <!-- 業種（industryーservice） から検索-->
      <div class="category_index">
        <button
          v-bind:disabled="Disabled"
          class="categories"
          v-on:click="clickIndustry"
        >
          業種▽
        </button>
        <button
          v-bind:disabled="Disabled"
          class="categories"
          v-on:click="clickArea"
        >
          地域▽
        </button>
      </div>

      <div class="clickedIndustry" v-if="clickedIndustry">
        <div class="category__scroll">
          <div
            class="category__industries"
            v-for="industry in industries"
            v-bind:key="industry"
          >
            <div
              class="category__services"
              v-for="serviceKind in industry.serviceKinds"
              v-bind:key="serviceKind"
            >
              <h4>{{ serviceKind.name }}</h4>
              <div
                class="radio__categories"
                v-for="service in serviceKind.services"
                v-bind:key="service"
              >
                <input
                  type="checkbox"
                  name="service"
                  v-bind:value="{ id: service.id, name: service.name }"
                  v-model="checkedValues"
                  v-bind:id="service.id"
                />
                <label> {{ service.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="searchSer">
          <button v-on:click="searchSer">検索</button>
        </div>
      </div>

      <!-- 地域（areaーprefecture）から探す -->

      <div class="clickedArea" v-if="clickedArea">
        <div class="category__scroll">
          <div
            class="category__prefectures"
            v-for="area in areas"
            v-bind:key="area"
          >
            <h4>{{ area.name }}</h4>

            <div
              class="radio__categories"
              v-for="prefecture in area.prefectures"
              v-bind:key="prefecture"
            >
              <input
                type="radio"
                name="prefecture"
                v-bind:value="prefecture.name"
                v-model="radioValue"
                v-bind:id="prefecture.code"
              />
              <label v-bind:for="prefecture.code"> {{ prefecture.name }}</label>
            </div>
          </div>
        </div>
        <div class="searchPre">
          <button v-on:click="searchPre">検索</button>
        </div>
      </div>
    </section>

    <!-- 検索結果表示エリア -->

    <section v-if="clickedCategory" id="list__corporations">
      <div class="list_corporation">
        <p class="searchWord">
          <span>🔍{{ searchWord }}&nbsp;検索結果</span>
        </p>
        <!-- 絞り込み検索オプション -->
        <div class="add_clear">
          <div v-if="clickedCategoryA">
            <input
              type="text"
              v-model="keywords"
              placeholder="絞込キーワードを入力"
            />
            <button v-on:click="addKeywordsA()">絞り込み検索</button>
          </div>
          <div v-if="clickedCategoryS">
            <input
              type="text"
              v-model="keywords"
              placeholder="絞込キーワードを入力"
            />
            <button v-on:click="addKeywordsS()">絞り込み検索</button>
          </div>
          <button v-on:click="Category_clear" class="category_clear">
            条件をクリア
          </button>
        </div>
        <!-- --- -->
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
</template>

<script>
export default {
  data() {
    return {
      clickedIndustry: false,
      clickedArea: false,
      clickedCategory: false,
      Disabled: false,
      clickedCategoryA: false,
      clickedCategoryS: false,
      parPage: 10,
      currentPage: 1,
      searchWord: "",
      checkedValueId: [],
      checkedValueName: [],
      checkedValues: [],
      radioValue: "",
      areas: [],
      industries: [],
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
  methods: {
    // 表示・非表示の切り替え
    clickIndustry() {
      this.clickedIndustry = true;
      this.clickedArea = false;
    },
    clickArea() {
      this.clickedArea = true;
      this.clickedIndustry = false;
    },

    searchSer() {
      // チェックボックス選択時動作（service）
      let checkedCount = this.checkedValues.length;
      for (let i = 0; i < checkedCount; i++) {
        this.checkedValueId[i] = this.checkedValues[i].id;
        this.checkedValueName[i] = this.checkedValues[i].name;
      }
      let url =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&services=" +
        this.checkedValueId;
      this.axios
        .get(url)
        .then((response) => (this.corporations = response.data.corporations))

        .catch((error) => console.log(error));
      this.searchWord = this.checkedValueName;
      this.clickedCategory = true;
      this.clickedArea = false;
      this.clickedIndustry = false;
      this.Disabled = true;
      this.clickedCategoryS = true;
    },

    searchPre() {
      // ラジオボタン選択時動作（prefecture）
      let url =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&location=" +
        this.radioValue;

      this.axios
        .get(url)
        .then((response) => (this.corporations = response.data.corporations))

        .catch((error) => console.log(error));
      this.searchWord = this.radioValue;
      this.clickedCategory = true;
      this.clickedArea = false;
      this.clickedIndustry = false;
      this.Disabled = true;
      this.clickedCategoryA = true;
    },
    addKeywordsA() {
      let url =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&location=" +
        this.radioValue +
        "&keywords=" +
        this.keywords;
      this.axios.get(url).then((response) => {
        this.corporations = response.data.corporations;
      });
    },
    addKeywordsS() {
      let url =
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?limit=100&services=" +
        this.checkedValueId +
        "&keywords=" +
        this.keywords;
      this.axios.get(url).then((response) => {
        this.corporations = response.data.corporations;
      });
    },

    Category_clear() {
      location.reload(true);
    },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
};
</script>

<style></style>
