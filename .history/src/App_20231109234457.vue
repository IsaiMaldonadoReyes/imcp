<template>
  <ion-app>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="#E9EDEE">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>
            hola
            <v-img src="../assets/images/logotipo.svg" height="40" max-width="40" />
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn icon size="x-small">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          temporary
          :rail="rail"
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-home-city"
              title="Home"
              value="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main> </v-main>
      </v-layout>
    </v-card>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <!--ion-label>Dashboard</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="certificado" href="/tabs/certificado">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <!--ion-label>Certificados Estatus</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="emitidos" href="/tabs/emitidos">
          <ion-icon aria-hidden="true" :icon="square" />
          <!--ion-label>Certificados emitidos</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="cuenta" href="/tabs/cuenta">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <!--ion-label>Mi cuenta</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="avisos" href="/tabs/avisos">
          <ion-icon aria-hidden="true" :icon="helpCircle" />
          <!--ion-label>Capacitaciones externas</ion-label-->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const drawer = ref(false);
    const rail = ref(false);
    const value = ref(1);

    const color = computed(() => {
      switch (value.value) {
        case 0:
          return "#B20000";
        case 1:
          return "#A9A9A9";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    });
    return { drawer, rail, value, color };
  },
});
</script>

<style>
@import "assets/css/login.css";
</style>
