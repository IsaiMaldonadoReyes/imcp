<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <div class="back"></div>
          <div class="esquina-tl-toolbar"></div>
          <ion-row class="d-flex align-center justify-center">
            <ion-col size="4">
              <img
                style="width: 110px"
                src="../assets/images/logotipo.svg"
                class="ml-5 mt-2"
              />
            </ion-col>
            <ion-col size="6" class="d-flex align-center justify-end">
              <v-list bg-color="transparent" class="imcp-header" @click="toggleMenu">
                <v-list-item
                  class="text-right"
                  :title="nombreUsuario"
                  :subtitle="'RFC:' + rfc"
                >
                  <template v-slot:append>
                    <div class="text-center">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="true"
                        location="bottom"
                      >
                        <template v-slot:activator="{ props }">
                          <v-btn
                            v-bind="props"
                            icon="mdi-menu-down"
                            size="small"
                            variant="text"
                            color="#424242"
                            style="font-size: 20px"
                          >
                          </v-btn>
                        </template>

                        <v-card color="transparent">
                          <v-list class="imcp-header mx-auto pa-2" color="transparent">
                            <v-list-item
                              :title="nombreUsuario"
                              :subtitle="'RFC ' + rfc"
                              class="mb-3"
                            >
                              <template v-slot:prepend>
                                <v-avatar color="#AAAAAA" size="small">
                                  <span class="text-h6">{{ iniciales }}</span>
                                </v-avatar>
                              </template>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item
                              class="mx-auto text-left"
                              variant="plain"
                              color="red"
                              :value="1"
                              rounded="xl"
                            >
                              <template v-slot:prepend>
                                <v-icon size="16" color="#B20000">
                                  <svg ref="icon" class="v-icon">
                                    <use
                                      xlink:href="../assets/images/ico.svg#ico-menu-micuenta"
                                    ></use>
                                  </svg>
                                </v-icon>
                              </template>
                              <v-list-item-title @click="miCuenta"
                                >Mi cuenta</v-list-item-title
                              >
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item variant="plain" @click="logout">
                              <template v-slot:prepend>
                                <v-icon size="16" color="#B20000">mdi-logout</v-icon>
                              </template>
                              <v-list-item-title>Cerrar sesión</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </ion-col>
            <ion-col size="2" class="d-flex align-center justify-end">
              <v-menu
                v-model="menuNotificacion"
                :close-on-content-click="false"
                location="bottom"
                max-width="330px"
                class="notificaciones"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="text-none text-left mr-3"
                    color="#B20000"
                    icon
                    variant="outlined"
                    size="small"
                    v-bind="props"
                  >
                    <v-badge
                      class="small-dot"
                      :content="cantidadNotificaciones"
                      text-color="#ffffff"
                      location="center"
                    >
                      <v-icon color="#B20000" size="30">mdi-bell</v-icon>
                    </v-badge>
                  </v-btn>
                </template>

                <v-card>
                  <v-list :items="notificaciones" item-props lines="three">
                    <template v-for="(notificacion, index) in notificaciones">
                      <template v-if="notificacion.type === 'subheader'">
                        <v-list-subheader :key="index">{{
                          notificacion.title
                        }}</v-list-subheader>
                      </template>
                      <template v-else-if="notificacion.type === 'divider'">
                        <v-divider :key="index"></v-divider>
                      </template>
                      <template v-else>
                        <v-list-item>
                          <v-list-item-title
                            v-html="notificacion.title"
                            class="notificacion-title"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="notificacion.subtitle"
                            class="notificacion-subtitle"
                          ></v-list-item-subtitle>
                        </v-list-item>
                      </template>
                    </template>
                  </v-list>
                </v-card>
              </v-menu>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>
          <ion-tab-button tab="dashboard" href="/tabs/dashboard">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use xlink:href="../assets/images/ico.svg#ico-dashboard"></use>
              </svg>
            </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="pendientes" href="/tabs/certificadoEstatus">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use xlink:href="../assets/images/ico.svg#ico-certificados"></use>
              </svg>
            </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="emitidos" href="/tabs/emitidos">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use
                  xlink:href="../assets/images/ico.svg#ico-certificados-emitidos"
                ></use>
              </svg>
            </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="cuenta" href="/tabs/cuenta">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use xlink:href="../assets/images/ico.svg#ico-menu-micuenta"></use>
              </svg>
            </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="avisos" href="/tabs/capacitacionExternaListado">
            <v-icon size="30" class="v-icon"> mdi-file-certificate-outline </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="manifestaciones" href="/tabs/manifestacionListado">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use xlink:href="../assets/images/ico.svg#ico-menu-m"></use>
              </svg>
            </v-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonContent,
  IonHeader,
  onIonViewWillEnter,
  IonToolbar,
  IonTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { ellipse, helpCircle, square, triangle } from "ionicons/icons";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "../store/session";
import { useDashboardStore } from "../store/dashboard";
import { Storage } from "@ionic/storage";

export default defineComponent({
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCol,
    IonGrid,
    IonRow,
  },
  setup() {
    const session = useSessionStore();
    const dash = useDashboardStore();
    const router = useRouter();

    const fav = ref(true);
    const menu = ref(false);
    const menuNotificacion = ref(false);
    const message = ref(false);
    const hints = ref(false);
    const icon = ref(null);
    const iniciales = ref("");

    let rfc = ref<string>("");
    let nombreUsuario = ref<string>("");
    let intervalId: any = null;

    let cantidadNotificaciones = ref<number>(0);

    const notificaciones = ref<
      Array<{
        type: string;
        inset: boolean;
        title: string;
        subtitle: string;
        url: string;
      }>
    >([]);

    async function cargarTabs() {
      const storage = new Storage();
      storage.create();

      rfc.value = "";
      nombreUsuario.value = "";

      rfc.value = await storage.get("rfc");
      nombreUsuario.value = await storage.get("nombreUsuario");

      const palabras = nombreUsuario.value.split(" "); // Divide la cadena en palabras
      const inicialesArray = palabras.map((palabra) => palabra.charAt(0).toUpperCase()); // Obtiene la primera letra de cada palabra
      const inicialesCortas = inicialesArray.slice(0, 2).join(""); // Toma las primeras dos iniciales y las une en una cadena

      iniciales.value = inicialesCortas;
    }

    async function cargarNotificaciones() {
      console.log("cargar notificaciones cada 5 minutos");
      notificaciones.value.length = 0;
      notificaciones.value = [];

      await dash.loadNotifications();

      //console.log("Cargar notificaciones");

      const notifications = dash.object.notificaciones;

      if (Array.isArray(notifications)) {
        cantidadNotificaciones.value = notifications.length;

        notificaciones.value.push({
          type: "subheader",
          inset: false,
          title: notifications.length > 0 ? "Notificaciones" : "Sin notificaciones",
          subtitle: "",
          url: "",
        });
        notificaciones.value.push({
          type: "divider",
          inset: false,
          title: "",
          subtitle: "",
          url: "",
        });

        notifications.forEach((notification) => {
          notificaciones.value.push({
            type: "divider",
            inset: false,
            title: "",
            subtitle: "",
            url: "",
          });

          notificaciones.value.push({
            type: "",
            inset: false,
            title: notification.titulo,
            subtitle: `<span class="text-grey-darken-4">${notification.mensaje}</span>`,
            url: notification.url,
            //subtitle: `<span class="text-grey-darken-4">${notification.mensaje}</span> : <span class="text-red-darken-4">${notification.pointsRequired} puntos </span> <br/> <span class="text-grey-darken-4">Cuentas con:</span> : <span class="text-red-darken-4">${notification.pointsOwned} puntos </span>`,
          });
        });
      } else {
        notificaciones.value.push({
          type: "subheader",
          inset: false,
          title: "Sin notificaciones",
          subtitle: "",
          url: "",
        });

        //console.error("Hubo un error al cargar las notificaciones");
      }
    }

    onIonViewWillEnter(() => {
      notificaciones.value = [];
      rfc.value = "";
      nombreUsuario.value = "";

      cargarTabs();

      intervalId = setInterval(async () => {
        await cargarNotificaciones();
      }, 120000);
    });

    async function logout() {
      //console.log("Limpiar intervalo logout");
      clearInterval(intervalId);

      try {
        await session.logout();
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }

    async function miCuenta() {
      router.push({ name: "cuenta" });
    }

    function toggleMenu() {
      menu.value = !menu.value; // Cambia el estado del menú
    }

    return {
      ellipse,
      helpCircle,
      square,
      triangle,
      fav,
      notificaciones,
      menu,
      menuNotificacion,
      message,
      hints,
      icon,
      rfc,
      nombreUsuario,
      cantidadNotificaciones,
      logout,
      miCuenta,
      iniciales,
      toggleMenu,
    };
  },
});
</script>

<style>
.v-btn__content {
  letter-spacing: normal;
}

ion-content {
  /**--ion-background-color: url("../assets/images/back.jpg");**/
  --ion-background-color: #eeeeee;
}

ion-tab-button.tab-selected {
  --color-selected: #b20000;
  /* Cambia el color del texto para la pestaña activa */
  --background-selected: #b20000;
  /* Cambia el color de fondo para la pestaña activa */
}

.imcp-header .v-list-item-title {
  color: #424242;
  font-size: 0.8rem;
}

.imcp-header .v-list-item-subtitle {
  color: #b20000;
  font-weight: bold;
  font-size: 0.7rem;
}

.notificacion-title {
  font-size: 0.9rem !important;
}

.notificacion-subtitle {
  font-size: 0.6rem !important;
}

.v-icon {
  /* Aplica el color del v-icon al SVG */
  fill: currentColor;
}

.small-dot .v-badge__badge {
  background-color: transparent;
}

.back-toolbar,
.esquina-br,
.esquina-tl-toolbar {
  position: absolute;
  object-fit: contain;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.esquina-tl-toolbar {
  background: url("../assets/images/esquina_superior_izquierda.png") top left no-repeat;
  z-index: -1;
  background-size: 22px;
}
</style>
