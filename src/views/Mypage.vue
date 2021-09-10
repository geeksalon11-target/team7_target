<template>
  <div>
    <button @click="del">アカウントを削除</button>

    <div class="me">
      <div class="info">
        <div v-if="edit">
          <tr>
            <th>名前：</th>
          </tr>
          <tr>
            <td><input type="text" v-model="name" /></td>
          </tr>
        </div>

        <div v-else>
          <div class="name">
            <h2>
              {{ this.profile.name }}
            </h2>
          </div>
        </div>

        <div v-if="edit">
          <tr>
            <th>お住まいの地域：</th>
          </tr>
          <tr>
            <td><input type="text" v-model="area" /></td>
          </tr>
        </div>

        <div v-else>
          <div class="area">
            <h3>お住まいの地域：</h3>
            <div class="ele">
              {{ this.profile.area }}
            </div>
          </div>
        </div>

        <div v-if="edit">
          <tr>
            <th>志望業種：</th>
          </tr>
          <tr>
            <td>
              <input type="text" v-model="gyousyu" />
            </td>
          </tr>
        </div>

        <div v-else>
          <div class="industry">
            <h3>志望業種：</h3>
            <div class="ele">
              {{ this.profile.industry }}
            </div>
          </div>
        </div>

        <div v-if="edit">
          <tr>
            <th>志望職種：</th>
          </tr>
          <tr>
            <td>
              <input type="text" v-model="syokusyu" />
            </td>
          </tr>
        </div>

        <div v-else>
          <div class="occupation">
            <h3>志望職種：</h3>
            <div class="ele">
              {{ this.profile.occupation }}
            </div>
          </div>
        </div>
        <div class="favcom">
          <router-link to="/coliked" class="favorite"
            >お気に入り企業一覧</router-link
          >
        </div>
      </div>
    </div>

    <div v-if="edit">
      <button @click="discard">編集をやめる</button>
      <button @click="pro">変更する</button>
    </div>
    <button v-else @click="hennsyuu">編集</button>
    <router-link to="/edit">メールアドレスとパスワードを変更</router-link>
  </div>
</template>

<style scoped>
.me {
  display: flex;
  justify-content: center;
}

.info {
  margin: 3rem;
  height: 25rem;
  width: 50rem;
}

.name {
  height: 4rem;
  background: linear-gradient(0.25turn, #59aff1, 33%, white);
  color: white;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.area {
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #59aff1;
  border-image: linear-gradient(to right, white, #59aff1 33%, white);
  border-image-slice: 1;
}
.area h3 {
  width: 33%;
  display: flex;
  flex-direction: row-reverse;
}

.industry {
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #59aff1;
  border-image: linear-gradient(to right, white, #59aff1 33%, white);
  border-image-slice: 1;
}
.industry h3 {
  width: 33%;
  display: flex;
  flex-direction: row-reverse;
}

.occupation {
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #59aff1;
  border-image: linear-gradient(to right, white, #59aff1 33%, white);
  border-image-slice: 1;
}
.occupation h3 {
  width: 33%;
  display: flex;
  flex-direction: row-reverse;
}

.ele {
  margin-left: 2rem;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  font-weight: bolder;
}

.favcom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.favorite {
  text-decoration: none;
  margin: 0.5rem;
  height: 4rem;
  width: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border-radius: 20rem / 4rem;
  border: 1px solid #59aff1;
}
</style>

<script>
import firebase from "firebase";
export default {
  components: {},
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
    update: function () {
      this.user.updateEmail(this.email).then(() => {
        this.user.updatePassword(this.password);
      });
    },
    pro: function () {
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
    hennsyuu: function () {
      this.edit = true;
    },
    discard: function () {
      this.edit = false;
    },
    del: function () {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .delete()
        .then(() => {
          firebase.auth().currentUser.delete();
        })
        .then(() => {
          this.$router.push("/in");
        })
        .catch(() => {
          alert("エラー");
        });
    },
  },
  created: function () {
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
            this.name = this.profile.name;
            this.area = this.profile.area;
            this.industry = this.profile.industry;
            this.occupation = this.profile.occupation;
          });
      } else {
        alert("ログインされていません。");
      }
    });
  },
};
</script>
