<template>
  <div class="NavBar">
    <ul id="nav">
      <li class="nav__content">
        <router-link to="/">中小企業検索</router-link>
      </li>
      <li class="nav__content"><router-link to="">マイページ</router-link></li>
      <li class="nav__content"><Signout /></li>
    </ul>
  </div>
</template>
<script>
import Signout from "../components/Signout";
export default {
  components: {
    Signout,
  },
};
</script>

<style scoped>
#nav {
  width: 100%;
  display: flex;
  justify-content: center;
}
.nav__content {
  width: 200px;
  padding: 1em 0;
  font-size: 18px;
  text-align: center;
}
</style>
