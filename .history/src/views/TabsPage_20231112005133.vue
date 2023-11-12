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
          <v-app-bar-title>
            <v-img
              class="logo"
              max-height="100%"
              max-width="200px"
              src="../assets/images/logotipo.svg"
            />
          </v-app-bar-title>

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
          <v-icon size="30">
            <svg ref="icon" class="v-icon">
              <use xlink:href="../assets/images/ico.svg#ico-dashboard"></use>
            </svg>
          </v-icon>
        </ion-tab-button>

        <ion-tab-button tab="emitidos" href="/tabs/emitidos">
          <v-icon size="30">
            <svg ref="icon" class="v-icon">
              <use xlink:href="../assets/images/ico.svg#ico-certificados"></use>
            </svg>
          </v-icon>
        </ion-tab-button>

        <ion-tab-button tab="certificado" href="/tabs/certificado">
          <v-icon size="30">
            <svg ref="icon" class="v-icon">
              <use xlink:href="../assets/images/ico.svg#ico-certificados-emitidos"></use>
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

        <ion-tab-button tab="avisos" href="/tabs/avisos">
          <v-icon size="30">
            <svg ref="icon" class="v-icon">
              <use xlink:href="../assets/images/ico.svg#ico-menu-m"></use>
            </svg>
          </v-icon>
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
    };
  },
});
</script>

<style>
ion-router-outlet {
  --background-color: red;
}
ion-tab-button.tab-selected {
  --color-selected: #b20000; /* Cambia el color del texto para la pestaña activa */
  --background-selected: #b20000; /* Cambia el color de fondo para la pestaña activa */
}
.v-icon {
  /* Aplica el color del v-icon al SVG */
  fill: currentColor;
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
</style>
