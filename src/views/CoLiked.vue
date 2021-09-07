<template>
  <div id="CoLiked">
    <h1 class="page_title">{{ profile.name }}さんのお気に入り企業</h1>
    <section id="list__corporations">
      <div>
        <div
          class="list_corporation"
          v-for="likeCor in profile.likeCorp"
          v-bind:key="likeCor"
        >
          <router-link
            :to="{
              name: 'Copage',
              params: { id: likeCor.Corpid },
              query: {
                name: likeCor.Corpname,
                nameKana: likeCor.Corpkana,
              },
            }"
            target="_blank"
          >
            <h3>{{ likeCor.Corpname }}</h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {},
      profile: {},

      likeCorp: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser;
        firebase
          .firestore()
          .collection("users")
          .doc(this.user.uid)
          .get()
          .then((docSnapshot) => {
            this.profile = docSnapshot.data();
            this.likeCorp = this.profile.likeCorp;
          });
      } else {
        alert("ログインされていません。");
      }
    });
  },
  method: {},
};
</script>
