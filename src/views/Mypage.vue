<template>
  <div>
    <Signout />
    <router-link to="/">ホームへ</router-link>
    <div v-if="edit">
      <tr>
        <th>名前：</th>
      </tr>
      <tr>
        <td><input type="text" v-model="name" v-bind="this.profile.name" /></td>
      </tr>
    </div>

    <div v-else>
      {{ this.profile.name }}
    </div>
    <div v-if="edit">
      <tr>
        <th>お住まいの地域：</th>
      </tr>
      <tr>
        <td><input type="text" v-model="area" v-bind="this.profile.area" /></td>
      </tr>
    </div>

    <div v-else>
      {{ this.profile.area }}
    </div>
    <div v-if="edit">
      <tr>
        <th>志望業種：</th>
      </tr>
      <tr>
        <td>
          <input type="text" v-model="gyousyu" v-bind="this.profile.industry" />
        </td>
      </tr>
    </div>

    <div v-else>
      {{ this.profile.industry }}
    </div>
    <div v-if="edit">
      <tr>
        <th>志望職種：</th>
      </tr>
      <tr>
        <td>
          <input
            type="text"
            v-model="syokusyu"
            v-bind="this.profile.occupation"
          />
        </td>
      </tr>
    </div>

    <div v-else>
      {{ this.profile.occupation }}
    </div>
    <div v-if="edit">
      <button @click="discard">編集をやめる</button>
      <button @click="pro">変更する</button>
    </div>
    <button v-else @click="hennsyuu">編集</button>
  </div>
</template>

<script>
import Signout from "../components/Signout.vue";
import firebase from "firebase";
export default {
  components: {
    Signout,
  },
  data() {
    return {
      user: {},
      profile: {},
      name: "",
      area: "",
      gyousyu: "",
      syokusyu: "",
      edit: false,
    };
  },
  methods: {
    update: function() {
      this.user.updateEmail(this.email).then(() => {
        this.user.updatePassword(this.password);
      });
    },
    pro: function() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          area: this.area,
          industry: this.gyousyu,
          name: this.name,
          occupation: this.syokusyu,
        })
        .then(() => {
          this.name = this.profile.name;
          this.area = this.profile.area;
          this.industry = this.profile.industry;
          this.occupation = this.profile.occupation;
          this.user = firebase.auth().currentUser;
          firebase
            .firestore()
            .collection("users")
            .doc(this.user.uid)
            .get()
            .then((docSnapshot) => {
              this.profile = docSnapshot.data();
            });
        })
        .then(() => {
          this.edit = false;
        });
    },
    hennsyuu: function() {
      this.edit = true;
    },
    discard: function() {
      this.edit = false;
    },
  },
  created: function() {
    this.name = this.profile.name;
    this.area = this.profile.area;
    this.industry = this.profile.industry;
    this.occupation = this.profile.occupation;
    this.user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .get()
      .then((docSnapshot) => {
        this.profile = docSnapshot.data();
      });
  },
};
</script>
