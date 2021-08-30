<template>
  <div><Coinfo /> <router-link to="/Casearch">条件検索＞</router-link></div>
</template>
<script>
import Coinfo from "../components/Coinfo.vue";
export default {
  components: {
    Coinfo,
  },
};
</script>
