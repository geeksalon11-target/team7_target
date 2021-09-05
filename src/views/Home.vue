<template>
  <div>
    <div id="top_visual"><h1>中小企業情報検索</h1></div>
    <ul id="SearchTools_index">
      <li class="current_index">キーワードから検索</li>
      <li>
        <router-link to="/Casearch">条件（地域・業種）から検索</router-link>
      </li>
    </ul>
    <div><Coinfo /></div>
  </div>
</template>
<script>
import Coinfo from "../components/Coinfo.vue";
export default {
  components: {
    Coinfo,
  },
};
</script>
