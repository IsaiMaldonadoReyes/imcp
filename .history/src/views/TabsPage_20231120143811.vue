<template>
  <ion-page>
    <ion-content>
      <ion-header style="height: 64px">
        g
      </ion-header>
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

          <ion-tab-button tab="emitidos" href="/tabs/certificadoEstatus">
            <v-icon size="30">
              <svg ref="icon" class="v-icon">
                <use xlink:href="../assets/images/ico.svg#ico-certificados"></use>
              </svg>
            </v-icon>
          </ion-tab-button>

          <ion-tab-button tab="certificado" href="/tabs/emitidos">
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

          <ion-tab-button tab="avisos" href="/tabs/capacitacionExterna">
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
} from "@ionic/vue";
import { ellipse, helpCircle, square, triangle } from "ionicons/icons";
import { defineComponent, ref, inject, onMounted } from "vue";
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

    let rfc = ref<string>("");
    let nombreUsuario = ref<string>("");

    let cantidadNotificaciones = ref<number>(0);

    const items = ref<
      Array<
        | { title: string; subtitle: string }
        | { type: string; inset: boolean; title: string; subtitle: string }
        | { type: string; inset: boolean }
      >
    >([]);

    const fetchData = async () => {
      const storage = new Storage();
      storage.create();

      rfc.value = await storage.get("rfc");
      nombreUsuario.value = await storage.get("nombreUsuario");

      loadNotifications(rfc.value);
    };

    onMounted(() => {
      fetchData();
    });

    async function loadNotifications(rfcUser: string) {
      await dash.loadNotifications(rfcUser);

      const notifications = dash.object;
      items.value.length = 0;

      items.value.push({ type: "subheader", title: "Notificaciones", subtitle: "" });
      items.value.push({ type: "divider", inset: false, title: "", subtitle: "" });

      if (Array.isArray(notifications)) {
        // Añade el encabezado
        cantidadNotificaciones.value = notifications.length;

        // Añade las notificaciones
        notifications.forEach((notification) => {
          items.value.push({
            type: "divider",
            inset: false,
          });

          items.value.push({
            title: notification.title,
            subtitle: `<span class="text-grey-darken-4">${notification.subtitle}</span> : ${notification.pointsRequired} puntos <br/> <span class="text-grey-darken-4">Cuentas con:</span> : ${notification.pointsOwned} puntos`,
          });
        });
      } else {
        console.error("El objeto 'notifications' no es un array.");
      }
    }

    async function logout() {
      try {
        await session.logout();
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }

    return {
      ellipse,
      helpCircle,
      square,
      triangle,
      fav,
      items,
      menu,
      menuNotificacion,
      message,
      hints,
      icon,
      rfc,
      nombreUsuario,
      cantidadNotificaciones,
      logout,
    };
  },
});
</script>

<style>
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
  font-size: 0.8rem;
}

.imcp-header .v-list-item-subtitle {
  color: #b20000;
  font-weight: bold;
  font-size: 0.7rem;
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
