import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Casearch from "../views/CaSearch.vue";
import Copage from "../views/CoPage.vue";
import In from "../views/In.vue";
import Up from "../views/Up.vue";
// import Coinfo from "../components/Coinfo.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
  }
];
import firebase from "firebase";

const router = new VueRouter({
  // mode: "hash",
  // base: "/up/",
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("router")
  console.log(firebase.auth().currentUser)
    // 認証状態を取得
    firebase.auth().onAuthStateChanged( (user) => {
      console.log(user)
      next()
      // if (user) {
      //   console.log("if")
      //   next()
      // } else {
      //   console.log("else")
        // 認証されていない場合、認証画面へ
      //   next({ name: "In" })
      // }
      // if (user) {
      //   next()
      // }else{
      // next({name:"In"});
      // }
    })
});

export default router;