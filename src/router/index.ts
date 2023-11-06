import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/ResetPassword.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/dashboard",
      },
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
      },
      {
        path: "certificado",
        component: () => import("@/views/certificado/CertificadoEstatus.vue"),
      },
      {
        path: "emitidos",
        component: () => import("@/views/certificado/CertificadoEmitidos.vue"),
      },
      {
        path: "cuenta",
        component: () => import("@/views/cuenta/MiCuenta.vue"),
      },
      {
        path: "avisos",
        component: () => import("@/views/capacitacionExterna/AvisoCapacitacion.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
