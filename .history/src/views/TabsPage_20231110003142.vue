<template>
  <ion-page>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="#E9EDEE">
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

        <v-main> </v-main>
      </v-layout>
    </v-card>
    <ion-header>
      <ion-toolbar>
        <v-layout>
          <v-app-bar color="#E9EDEE">
            <v-app-bar-title>
              <v-img src="../assets/images/logotipo.svg" height="70%" />
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn variant="outlined" class="text-none" stacked >
              <v-badge content="2" color="#B01F24">
                <v-icon color="#AAAAAA">mdi-bell</v-icon>
              </v-badge>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
        </v-layout>
      </ion-toolbar>
    </ion-header>
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
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { ellipse, helpCircle, square, triangle } from "ionicons/icons";
</script>
