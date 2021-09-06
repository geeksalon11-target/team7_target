<template>
  <div>
    <TopVisual />
    <ul id="SearchTools_index">
      <li class="current_index">キーワードから検索</li>
      <li class="another_index">
        <router-link to="/Casearch">条件から検索</router-link>
      </li>
    </ul>
    <div><Coinfo /></div>
  </div>
</template>
<script>
import Coinfo from "../components/Coinfo.vue";
import TopVisual from "../components/TopVisual.vue";
export default {
  components: {
    Coinfo,
    TopVisual,
  },
};
</script>
