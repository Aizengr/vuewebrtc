import { createRouter, createWebHistory } from "vue-router";
import TheHomepage from "./components/Layout/TheHomepage.vue";
import ConferenceRoom from "./components/Layout/ConferenceRoom.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheHomepage,
    },
    {
      path: "/room/:id",
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

export default router;
