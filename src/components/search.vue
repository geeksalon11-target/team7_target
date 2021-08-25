<template>
  <div id="category_search">
    <h2>条件検索機能</h2>
    {{ info }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    this.axios
      .get(" https://u10sme-api.smrj.go.jp/v1/corporations.json")
      .then((response) => (this.info = response))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
