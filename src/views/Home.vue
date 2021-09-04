<template>
  <div>
    <Signout />
    <Coinfo />
  </div>
</template>
<script>
import Coinfo from "../components/Coinfo.vue";
import Signout from "../components/Signout";
export default {
  components: {
    Coinfo,
    Signout,
  },
};
</script>
