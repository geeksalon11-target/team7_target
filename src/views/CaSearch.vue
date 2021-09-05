<template>
  <div>
    <div id="top_visual"><h1>中小企業情報検索</h1></div>
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
export default {
  components: {
    Search,
  },
};
</script>
