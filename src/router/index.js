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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
