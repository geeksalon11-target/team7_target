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
            <h3>★{{ likeCor.Corpname }}</h3>
          </router-link>
          <div class="deleteCorp">
            <button v-on:click="deleteCorp(likeCor.Corpid)">登録解除</button>
          </div>
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
          .then((doc) => {
            this.profile = doc.data();
            this.likeCorp = this.profile.likeCorp;
          });
      }
    });
  },
  methods: {
    deleteCorp(deleteId) {
      for (let i = 0; i < this.profile.likeCorp.length; i++) {
        if (deleteId == this.profile.likeCorp[i].Corpid) {
          this.profile.likeCorp.splice(i, 1);
        }
      }
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .set(this.profile);
    },
  },
};
</script>
