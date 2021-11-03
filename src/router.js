import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Account from "./components/Account.vue";
import Product from "./components/Product.vue";
import Library from "./components/Library.vue";
import ProductDetail from "./components/ProductDetail.vue";
import AllUsers from "./components/AllUsers.vue";
import Exchange from "./components/Exchange.vue";
import ProductUpdate from "./components/ProductUpdate.vue";
import UserUpdate from "./components/UserUpdate.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },
  {
    path: "/user/logIn",
    name: "logIn",
    component: LogIn,
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/user/home",
    name: "home",
    component: Home,
  },
  {
    path: "/user/account",
    name: "account",
    component: Account,
  },
  {
    path: "/user/product",
    name: "product",
    component: Product
  }, 
  {
    path: "/user/library",
    name: "library",
    component: Library
  }, 
  {
    path: "/user/productDetail",
    name: "productDetail",
    component: ProductDetail
  },
  {
    path: "/user/allUsers",
    name: "allUsers",
    component: AllUsers
  },
  {
    path: "/user/exchange",
    name: "exchange",
    component: Exchange
  },
  {
    path: "/user/updateProduct",
    name: "updateProduct",
    component: ProductUpdate
  },
  {
    path: "/usr/userUpdate",
    name: "userUpdate",
    component: UserUpdate,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
