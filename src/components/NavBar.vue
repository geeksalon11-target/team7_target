<template>
  <div class="NavBar">
    <ul id="nav">
      <li class="nav__content">
        <router-link to="/">検索TOP</router-link>
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

<style scoped></style>
