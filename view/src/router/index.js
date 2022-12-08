import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "home",
    component: function () {
      return import(
        /* webpackChunkName: "home" */ "../views/HomeView.vue"
        );
    },
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import(
        /* webpackChunkName: "login" */ "../views/LoginView.vue"
        );
    },
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import(
        /* webpackChunkName: "register" */ "../views/RegisterView.vue"
      );
    },
  },
  {
    path: "/create",
    name: "createcourse",
    component: function () {
      return import(
        /* webpackChunkName: "createcourse" */ "../views/CreateCourse.vue"
      );
    },
  },
  {
    path: "/join",
    name: "joincourse",
    component: function () {
      return import(
        /* webpackChunkName: "joincourse" */ "../views/JoinView.vue"
      );
    },
  },
  {
    path: "/course/:course_id",
    name: "course",
    component: function () {
      return import(/* webpackChunkName: "course" */ "../views/CourseView.vue");
    },
    children: [
      {
        path: "questions",
        name: "questions",
        component: function () {
          return import(
            /* webpackChunkName: "questions" */ "../components/QuestionTab.vue"
          );
        },
        children: [
          {
            path: ":question_id",
            name: "question",
            component: function () {
              return import(
                /* webpackChunkName: "questions" */ "../components/QuestionComp.vue"
              );
            },
          },
        ],
      },
      {
        path: "chat",
        name: "chat",
        component: function () {
          return import(
            /* webpackChunkName: "chat" */ "../components/ChatTab.vue"
          );
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  axios
    .get("/account/status")
    .then(() => {
      if (to.name !== "login" && to.name !== "register") next();
      else next("/");
    })
    .catch(() => {
      if (to.name !== "login" && to.name !== "register") next("login");
      else next();
    });
});

export default router;
