import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { useSessionStore } from '../store/session';
import { Storage } from '@ionic/storage';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/ResetPassword.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/tabs/dashboard",
      },
      {
        path: "dashboard", // vista principal - dashboard
        component: () => import("@/views/dashboard/Dashboard.vue"),
      },
      {
        path: "desglosePuntos", // dashboard
        component: () => import("@/views/dashboard/DesglosePuntos.vue"),
      },
      {
        path: "certificadoEstatus", // vista principal - certificado estatus
        component: () => import("@/views/certificado/CertificadoEstatus.vue"),
      },
      {
        path: "certificadoPuntos", // certificado estatus
        component: () => import("@/views/certificado/CertificadoPuntos.vue"),
      },
      {
        path: "certificadoPuntosDesglose", // certificado estatus
        component: () => import("@/views/certificado/CertificadoPuntosDesglosados.vue"),
      },
      {
        path: "seleccionPago", // certificado pago 
        component: () => import("@/views/pago/PagoSeleccion.vue"),
      },
      {
        path: "actualizacionDatos", // certificado pago 
        component: () => import("@/views/pago/ActualizacionDatos.vue"),
      },
      {
        path: "tarjetaDatos", // certificado pago 
        component: () => import("@/views/pago/TarjetaDatos.vue"),
      },
      {
        path: "resumenPago", // certificado pago 
        component: () => import("@/views/pago/ResumenPago.vue"),
      },
      {
        path: "emitidos", // vista principal
        component: () => import("@/views/certificado/CertificadoEmitidos.vue"),
      },
      {
        path: "cuenta", // vista principal
        component: () => import("@/views/cuenta/MiCuenta.vue"),
      },
      {
        path: "capacitacionExterna", // vista principal capacitacion externa
        component: () => import("@/views/capacitacionExterna/CapacitacionListado.vue"),
      },
      {
        path: "detalleCapacitacion", // capacitacion externa
        component: () => import("@/views/capacitacionExterna/DetalleCapacitacion.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, from, next) => {

  const storeSession = useSessionStore();
  const storage = new Storage();
  storage.create();

  const isAuth = await storage.get('logged');

  if (isAuth && from.path === "/" && to.path !== "/tabs/dashboard") {
    // Si el usuario está autenticado y está yendo a la raíz, redirígelo a /tabs/dashboard
    next('/tabs/dashboard');
  } else if (!to.meta.requiresAuth || isAuth) {
    // Si la ruta no requiere autenticación o el usuario está autenticado, déjalo pasar
    next();
  } else {
    // Si el usuario no está autenticado y la ruta requiere autenticación, redirígelo al login
    next('/login');
  }


});


export default router;
