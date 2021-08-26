<template>
  <div id="CategorySearch">
    <h2>条件検索</h2>
    <!-- 条件検索エリア -->
    <section id="list__categories">
      <div>
        <h3 class="categories" v-on:click="clickIndustry">業種から探す↓</h3>

        <div v-if="clickedIndustry">
          <div
            class="category__industries"
            v-for="industry in industries"
            v-bind:key="industry"
          >
            <h4>{{ industry.name }}</h4>
            <div
              class="category__services"
              v-for="serviceKind in industry.serviceKinds"
              v-bind:key="serviceKind"
            >
              <h5>{{ serviceKind.name }}</h5>
              <div
                class="radio__categories"
                v-for="service in serviceKind.services"
                v-bind:key="service"
              >
                <input
                  type="radio"
                  name="service"
                  v-bind:value="service.name"
                  v-on:change="clickSer(service.id)"
                  v-bind:id="service.id"
                />
                <label> {{ service.name }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="categories" v-on:click="clickArea">地域から探す↓</h3>

        <div v-if="clickedArea">
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
                v-on:change="clickPre(prefecture.code)"
                v-bind:id="prefecture.code"
              />
              <label v-bind:for="prefecture.code"> {{ prefecture.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 検索結果表示エリア -->
    <section v-if="clickedCategory" id="list__corporations">
      <div v-for="corporation in corporations" v-bind:key="corporation">
        <h3>{{ corporation.name }}</h3>

        <div
          v-for="serviceCategory in corporation.serviceCategories"
          v-bind:key="serviceCategory"
        >
          <div
            v-for="serviceKind in serviceCategory.serviceKinds"
            v-bind:key="serviceKind"
          >
            <p>＜{{ serviceKind.name }}＞</p>
            <ul v-for="service in serviceKind.services" v-bind:key="service">
              <li>{{ service.name }}</li>
            </ul>
          </div>
        </div>
        <p>{{ corporation.profile }}</p>
        <p>{{ corporation.location.address }}</p>
        <a>{{ corporation.url }}</a>
      </div>
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
      isSelected: false,
      areas: [],
      industries: [],
      corporations: [],
    };
  },
  mounted() {
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
    clickIndustry() {
      this.clickedIndustry = true;
      this.clickedArea = false;
    },
    clickArea() {
      this.clickedArea = true;
      this.clickedIndustry = false;
    },
    clickSer(id) {
      if (id === "1") {
        this.axios
          .get("https://u10sme-api.smrj.go.jp/v1/corporations.json?services=1")
          .then((response) => (this.corporations = response.data.corporations))

          .catch((error) => console.log(error));
        this.clickedCategory = true;
      }
    },
    clickPre(code) {
      if (code === "01") {
        this.axios
          .get(
            "https://u10sme-api.smrj.go.jp/v1/corporations.json?location=北海道"
          )
          .then((response) => (this.corporations = response.data.corporations))

          .catch((error) => console.log(error));
        this.clickedCategory = true;
      } else if (code === "02") {
        this.axios
          .get(
            "https://u10sme-api.smrj.go.jp/v1/corporations.json?location=青森県"
          )
          .then((response) => (this.corporations = response.data.corporations))

          .catch((error) => console.log(error));
        this.clickedCategory = true;
      } else if (code === "03") {
        this.axios
          .get(
            "https://u10sme-api.smrj.go.jp/v1/corporations.json?location=岩手県"
          )
          .then((response) => (this.corporations = response.data.corporations))

          .catch((error) => console.log(error));
        this.clickedCategory = true;
      }
    },
  },
};
</script>

<style>
section#list__categories {
  border-bottom: solid 1px;
}
.category__prefectures,
.category__industries,
.category__services {
  overflow: hidden;
}
.radio__categories {
  float: left;
}
</style>
