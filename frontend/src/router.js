import { createRouter, createWebHistory } from "vue-router";
import TheHomepage from "./components/Layout/TheHomepage.vue";
import ConferenceRoom from "./components/Layout/ConferenceRoom.vue";
import { createRoom } from "./socket.js";
import store from "./main";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheHomepage,
    },
    {
      path: "/createRoom",
      name: "createRoom",
      beforeEnter: [connectToRoom],
      query: "username",
      redirect: () => {
        return {
          path: `/room/${store.getters.getRoomID}`,
        };
      },
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

function connectToRoom(route) {
  createRoom(route.query.username);
  route.query;
}

export default router;
