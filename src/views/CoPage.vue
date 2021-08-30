<template>
  <div>
    <section>
      <div v-for="corporation in corporations" v-bind:key="corporation.id">
        <h3>{{ corporation.name }}</h3>
        <div
          v-for="serviceCategory in corporation.serviceCategories"
          v-bind:key="serviceCategory"
        >
          <div
            v-for="serviceKind in serviceCategory.serviceKinds"
            v-bind:key="serviceKind"
          >
            <p>{{ serviceKind.name }}</p>
          </div>
        </div>
        <p>取引先：{{ corporation.businessResults }}</p>
        <p>{{ corporation.profile }}</p>
        <p>{{ corporation.location.address }}</p>
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
    };
  },
  mounted() {
    this.axios
      .get(
        "https://u10sme-api.smrj.go.jp/v1/corporations.json?keywords=" +
          this.resultName
      )
      .then((response) => (this.corporations = response.data.corporations))
      .catch((error) => console.log(error));
  },
};
</script>
