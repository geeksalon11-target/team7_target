import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Casearch from "../views/CaSearch.vue";
import Copage from "../views/CoPage.vue";
import In from "../views/In.vue";
import Up from "../views/Up.vue";
import Mypage from "../views/Mypage.vue";
import Edit from "../views/Edit.vue";
import CoLiked from "../views/CoLiked.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Casearch",
    name: "Casearch",
    component: Casearch,
  },
  {
    path: "/Copage/:id",
    name: "Copage",
    component: Copage,
    props: true,
  },
  {
    path: "/in",
    name: "In",
    component: In,
  },
  {
    path: "/up",
    name: "Up",
    component: Up,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit,
  },
  {
    path: "/coliked",
    name: "CoLiked",
    component: CoLiked,
  },
];
import firebase from "firebase";

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("router")
  console.log(firebase.auth().currentUser)
    // 認証状態を取得
    firebase.auth().onAuthStateChanged( (user) => {
      console.log(user)
      next()
      if (user) {
        console.log("if")
        next()
      } else {
        console.log("else")
        // 認証されていない場合、認証画面へ
        next({ name: "In" })
      }
    })
});

export default router;