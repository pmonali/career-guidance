import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView";
import LoginForm from "../views/LoginForm";
import assesmentForm from "../views/assesmentForm";
import RegistrationForm from "../components/RegistrationForm";
import dashBoard from "../components/dashBoard";
import assesmentTen from "../views/assesmentTen";
import TrendinJob from "../components/TrendinJob";
import VocJob from "../components/VocJob";
import FooTer from "../components/FooTer";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashBoard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/voccareer",
    // name: "vocjob",
    component: VocJob,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "RegistrationForm",
    component: RegistrationForm,
  },
  {
    path: "/career",
    name: "TrendinJob",
    component: TrendinJob,
    meta: { requiresAuth: true },
  },
  {
    path: "/assessment",
    name: "assesment",
    component: assesmentForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/assessmentten",
    name: "assesmentten",
    component: assesmentTen,
    meta: { requiresAuth: true },
  },
  {
    path: "/foot",
    name: "footer",
    component: FooTer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("sessionID") !== null;

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    // If the route requires authentication and the user is not logged in, redirect to the login page
    next("/login");
  } else {
    // Otherwise, proceed to the next route
    next();
  }
});

export default router;
