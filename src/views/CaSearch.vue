<template>
  <div>
    <TopVisual />
    <div>
      <ul id="SearchTools_index">
        <li><router-link to="/">キーワードから検索</router-link></li>
        <li class="current_index">条件（地域・業種）から検索</li>
      </ul>
    </div>
    <Search />
  </div>
</template>
<script>
import Search from "@/components/search.vue";
import TopVisual from "../components/TopVisual.vue";
export default {
  components: {
    Search,
    TopVisual,
  },
};
</script>
