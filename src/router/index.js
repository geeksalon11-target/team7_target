import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Casearch from "../views/CaSearch.vue";
import Copage from "../views/CoPage.vue";
import In from "../views/In.vue";
import Up from "../views/Up.vue";
import Mypage from "../views/Mypage.vue";
import Edit from "../views/Edit.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
