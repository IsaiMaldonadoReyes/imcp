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
      <v-layout>
        <v-app-bar color="#EBEFF0">
          <v-app-bar-title>
            <v-img
              class="logo"
              src="../assets/images/logotipo.svg"
              max-height="90px"
              max-width="300px"
            />
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn class="text-none" icon variant="outlined" color="#B01F24">
            <v-badge content="2" color="#B01F24"  location="center" >
              <v-icon color="#B01F24" size="x-large">mdi-bell</v-icon>
            </v-badge>
          </v-btn>

          <!--v-btn class="text-none" icon color="#AAAAAA">
            <v-badge content="2" color="#B01F24"  >
              <v-icon color="#AAAAAA" >mdi-bell</v-icon>
            </v-badge>
          </v-btn-->

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
      </v-layout>
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

<style >
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Escala la imagen para llenar el contenedor sin distorsionarla */

  position: absolute; /* Permite ajustar la ubicación de la parte recortada */
  top: 0; /* Ajusta la posición vertical (puedes cambiarlo según tus necesidades) */
  left: 0; /* Ajusta la posición horizontal (puedes cambiarlo según tus necesidades) */
}

@import "../assets/sass/variables.scss";

</style>
