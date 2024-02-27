import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { Storage } from '@ionic/storage';

import Login from "../views/Login.vue";
import ResetPassword from "../views/ResetPassword.vue";

//import Dashboard from "../views/dashboard/Dashboard.vue";
//import DesglosePuntos from "../views/dashboard/DesglosePuntos.vue";
//import CertificadoEstatus from "../views/certificado/CertificadoEstatus.vue";
//import CertificadoPuntos from "../views/certificado/CertificadoPuntos.vue";
//import CertificadoPuntosDesglose from "../views/certificado/CertificadoPuntosDesglosados.vue";
//import CertificadoPagoSeleccionado from "../views/pago/PagoSeleccion.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: ResetPassword,
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
        redirect: "dashboard",
      },
      {
        path: "dashboard", // vista principal - dashboard
        name: "dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
      },
      {
        path: "desglosePuntos/:id", // dashboard
        name: "desglosePuntos",
        component: () => import("@/views/dashboard/DesglosePuntos.vue"),
      },
      {
        path: "certificadoEstatus", // vista principal - certificado estatus
        name: "certificadoEstatus",
        component: () => import("@/views/certificado/CertificadoEstatus.vue"),
      },
      {
        path: "certificadoPuntos/:idCertificado/:anhioInicio/:anhioFin/:numCertificado", // certificado estatus
        name: "certificadoPuntos",
        component: () => import("@/views/certificado/CertificadoPuntos.vue"),
      },
      {
        path: "certificadoPuntosDesglosados/:idCertificado/:anhio", // certificado estatus
        name: "certificadoPuntosDesglosados",
        component: () => import("@/views/certificado/CertificadoPuntosDesglosados.vue"),
      },
      {
        path: "seleccionAccion/:idCertificado/:estatus", // certificado pago  ISAI
        name: "seleccionAccion",
        component: () => import("@/views/pago/SeleccionAccion.vue"),
      },
      /*
      {
        path: "seleccionPagoCertificado/:idCertificado/:estatus", // certificado pago 
        name: "seleccionPagoCertificado",
        component: () => import("@/views/pago/PagoSeleccion.vue"),
      },*/
      {
        path: "actualizacionDatos/:idCertificado", // certificado pago 
        name: "actualizacionDatos",
        component: () => import("@/views/pago/ActualizacionDatos.vue"),
      },
      {
        path: "tarjetaDatos/:idCertificado/:estatus", // certificado pago 
        name: "tarjetaDatos",
        component: () => import("@/views/pago/TarjetaDatos.vue"),
      },
      {
        path: "resumenPago", // certificado pago 
        component: () => import("@/views/pago/ResumenPago.vue"),
      },
      {
        path: "emitidos", // vista principal
        name: "emitidos",
        component: () => import("@/views/certificado/CertificadoEmitidos.vue"),
      },
      {
        path: "cuenta", // vista principal
        name: "cuenta",
        component: () => import("@/views/cuenta/MiCuenta.vue"),
      },
      {
        path: "capacitacionExterna", // vista principal capacitacion externa
        name: "capacitacionExternaListado",
        component: () => import("@/views/capacitacionExterna/CapacitacionListado.vue"),
      },
      {
        path: "capacitacionExternaRegistro", // vista registro capacitacion externa
        name: "capacitacionExternaRegistro",
        component: () => import("@/views/capacitacionExterna/RegistroCapacitacion.vue"),
      },
      {
        path: "manifestacionListado", // vista principal capacitacion externa
        name: "manifestacionListado",
        component: () => import("@/views/manifestacion/ManifestacionListado.vue"),
      },
      {
        path: "manifestacionRegistro", // vista registro capacitacion externa
        name: "manifestacionRegistro",
        component: () => import("@/views/manifestacion/RegistroManifestacion.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, from, next) => {
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
