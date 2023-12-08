<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Pago de certificado
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="pa-2" elevation="0" border="">
          <v-card-text>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Tipo de pago *"
              no-data-text="No hay datos disponibles"
              placeholder="Débito Visa / Mastercard"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Nombre(s) *"
              placeholder="Nombre(s) como aparece en la tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Apellido(s) *"
              placeholder="Apllido(s) como aparece en la tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle"
              placeholder="Calle del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="País *"
              placeholder="País del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado *"
              placeholder="Estado del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Código *"
              placeholder="Código postal del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Celular *"
              placeholder="Celular del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Número de tarjeta *"
              placeholder="Número de tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Marca de la tarjeta *"
              no-data-text="No hay datos disponibles"
              placeholder="Marca de la tarjeta"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Tipo de tarjeta *"
              no-data-text="No hay datos disponibles"
              placeholder="Seleccione tipo de tarjeta"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Código de seguridad"
              placeholder="CVV"
              variant="outlined"
            >
              <template v-slot:append>
                <v-tooltip
                  location="top"
                  class="text-justify"
                  open-on-click
                  scroll-strategy="close"
                >
                  <template v-slot:activator="{ props }">
                    <v-icon small v-bind="props"> mdi-information-outline </v-icon>
                  </template>
                  <span>
                    El código CVV o CVC es un grupo de 3 o 4 números situado en el reverso
                    de la tarjeta de crédito o débito.
                  </span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useDashboardStore } from "@/store/dashboard";

export default defineComponent({
  name: "dashboard",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

    return {
      colores,
      show,
    };
  },
});
</script>

<style scoped lang="scss">
$tooltip-background-color: blue;
</style>
