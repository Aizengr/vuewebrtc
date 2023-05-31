import { createRouter, createWebHistory } from "vue-router";
import TheHomepage from "./components/Layout/TheHomepage.vue";
import ConferenceRoom from "./components/Layout/ConferenceRoom.vue";
import store from "./main.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheHomepage,
    },
    {
      path: "/room",
      name: "room",
      component: ConferenceRoom,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "room" && !store.state.connected) next({ name: "home" });
  else next();
});

export default router;
