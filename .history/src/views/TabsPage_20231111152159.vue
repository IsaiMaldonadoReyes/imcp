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
        <v-app-bar color="#EBEFF0" elevation="1">
          <div class="back" />
          <div class="esquina-tl-toolbar" />

          <img
            class="logo"
            height="90px"
            width="90px"
            src="../assets/images/logotipo.svg"
          />

          <v-spacer></v-spacer>

          <v-list>
            <v-list-item title="Rogerio Juan Bosco Casas" subtitle="RFC RJCA781002-HR7">
              <template v-slot:append>
                <div class="text-center">
                  <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="x-small"
                        variant="text"
                        icon="mdi-menu-down"
                        v-bind="props"
                      ></v-btn>
                    </template>

                    <v-card min-width="300">
                      <v-list>
                        <v-list-item
                          prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                          title="John Leider"
                          subtitle="Founder of Vuetify"
                        >
                        </v-list-item>
                      </v-list>

                      <v-divider></v-divider>

                      <v-list>
                        <v-list-item>
                          <v-switch
                            v-model="message"
                            color="purple"
                            label="Enable messages"
                            hide-details
                          ></v-switch>
                        </v-list-item>

                        <v-list-item>
                          <v-switch
                            v-model="hints"
                            color="purple"
                            label="Enable hints"
                            hide-details
                          ></v-switch>
                        </v-list-item>
                      </v-list>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
                        <v-btn color="primary" variant="text" @click="menu = false">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
              </template>
            </v-list-item>
          </v-list>

          <v-btn class="text-none" color="#B20000" icon variant="outlined">
            <v-badge class="small-dot" content="2" text-color="#ffffff" location="center">
              <v-icon color="#B20000" size="x-large">mdi-bell</v-icon>
            </v-badge>
          </v-btn>

          
          <v-icon icon="icon-icon_circulo_verde" size="30"></v-icon>
          <div class="glyph fs1">
            <div class="clearfix bshadow0 pbs">
                <span class="icon-icon_circulo_verde"></span>
                <span class="mls"> icon-icon_circulo_verde</span>
            </div>
            <fieldset class="fs0 size1of1 clearfix hidden-false">
                <input type="text" readonly value="e907" class="unit size1of2" />
                <input type="text" maxlength="1" readonly value="&#xe907;" class="unitRight size1of2 talign-right" />
            </fieldset>
            <div class="fs0 bshadow0 clearfix hidden-true">
                <span class="unit pvs fgc1">liga: </span>
                <input type="text" readonly value="" class="liga unitRight" />
            </div>
        </div>

          <!--v-btn class="text-none" icon color="#AAAAAA" variant="outlined">
            <v-badge content="2" color="#B01F24">
              <v-icon color="#AAAAAA">mdi-bell</v-icon>
            </v-badge>
          </v-btn>

          <v-btn class="text-none" icon color="#AAAAAA" >
            <v-badge content="2" color="#B01F24">
              <v-icon color="#AAAAAA">mdi-bell</v-icon>
            </v-badge>
          </v-btn-->
        </v-app-bar>
      </v-layout>
    </ion-header>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <v-icon size="32" icon="mdi-chart-pie-outline"></v-icon>
          <!--ion-label>Dashboard</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="certificado" href="/tabs/certificado">
          <v-icon size="32" icon="mdi-format-list-bulleted"></v-icon>
          <!--ion-label>Certificados Estatus</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="emitidos" href="/tabs/emitidos">
          <v-icon size="32" icon="mdi-check-decagram-outline"></v-icon>
          <!--ion-label>Certificados emitidos</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="cuenta" href="/tabs/cuenta">
          <v-icon size="32" icon="mdi-account-outline"></v-icon>
          <!--ion-label>Mi cuenta</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="avisos" href="/tabs/avisos">
          <!--i class="mdi-account-outline" icon="mdi-account-outline"></i-->
          <v-icon size="100" icon="icon-menu_micuenta">
           
          </v-icon>
          <!--ion-label>Capacitaciones externas</ion-label-->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
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
} from "@ionic/vue";
import { ellipse, helpCircle, square, triangle } from "ionicons/icons";
import { defineComponent, ref, inject } from "vue";

export default defineComponent({
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    const fav = ref(true);
    const menu = ref(false);
    const message = ref(false);
    const hints = ref(false);

    const icon = ref(null);

    // Función para cambiar el color del SVG
    const changeSVGColor = (newColor: string) => {
      if (icon.value) {
        const svgDocument = icon.value.contentDocument;
        icon.value.style.fill = `brightness(0) sepia(1) hue-rotate(${newColor}deg)`;
      }
    };

    return {
      ellipse,
      helpCircle,
      square,
      triangle,
      fav,
      menu,
      message,
      hints,
      icon,
      changeSVGColor,
    };
  },
});
</script>

<style>
.icon-container {
  color: red; /* Define el color deseado para el v-icon */
}

.small-dot .v-badge__badge {
  background-color: transparent;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Escala la imagen para llenar el contenedor sin distorsionarla */

  position: absolute; /* Permite ajustar la ubicación de la parte recortada */
  top: 0; /* Ajusta la posición vertical (puedes cambiarlo según tus necesidades) */
  left: 0; /* Ajusta la posición horizontal (puedes cambiarlo según tus necesidades) */
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
  background-size: 7%;
}

.custom-icon .st0 {
  width: 100%;
  height: 100%;
  fill: currentColor; /* Esto asumirá el color actual del elemento padre, en este caso, el color de v-icon */
}

@import url("../assets/css/icomoon/style.css");
</style>
