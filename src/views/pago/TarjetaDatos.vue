<template>
  <ion-page>
    <ion-content>
      <v-container class="big-container" fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Pago de certificado
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-card class="" elevation="0" border="">
          <iframe
            :src="`https://tienda.imcp.org.mx/api/datos_inv_dpc.php?token=${token}`"
            width="100%"
            height="600px"
            frameborder="0"
          ></iframe>
          <v-progress-linear
            indeterminate
            color="#FC4876"
            height="10"
          ></v-progress-linear>
          <v-card-text class="text-justify">
            <span class="text-subtitle-1 text-grey-darken-1">
              Esperando información del pago...
            </span>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-container>
      <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-grey-darken-1" style="text-align: center">
            {{ dialogPropiedades.mensajeTitulo }}</v-card-title
          >
          <lottie-animation
            v-if="dialogPropiedades.correcto"
            ref="anim"
            :animationData="PaymentSuccess"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <lottie-animation
            v-else
            ref="anim"
            :animationData="PaymentError"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <v-card-text class="text-justify">
            <span class="text-subtitle-1 text-grey-darken-1">
              {{ dialogPropiedades.mensajeCuerpo }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="colores.verdeBoton"
              block
              size="large"
              variant="flat"
              @click="cerrardialogPropiedades(dialogPropiedades.correcto)"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  onIonViewDidLeave,
  IonDatetime,
  alertController,
} from "@ionic/vue";
import { VDatePicker, VDatePickerMonth } from "vuetify/lib/labs/components.mjs";
import { useRouter, Router, useRoute } from "vue-router";
import { usePagoStore } from "@/store/pago";
import { LottieAnimation } from "lottie-web-vue";

import PaymentLoading from "../../assets/images/payment-loading.json";
import PaymentError from "../../assets/images/payment-error.json";
import PaymentSuccess from "../../assets/images/payment-success.json";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  return alert;
};

export interface Pagos {
  tienda: Tienda[];
}

export interface Tienda {
  id: string;
  nopedido: string;
  forma_pago: string;
  status: string;
  fecha_modificacion: string;
  fecha_pago: string;
  id_token: number;
  token: string;
}

export default defineComponent({
  name: "TarjetaDatos",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
    VDatePickerMonth,
    IonDatetime,
    LottieAnimation,
  },

  setup() {
    const route = useRoute();
    const router: Router = useRouter();

    const pagoStore = usePagoStore();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    let anim = ref();

    const dialogPropiedades = ref({
      dialog: false,
      mensajeTitulo: "",
      mensajeCuerpo: "",
      correcto: false,
    });

    const idToken = ref(0);
    const token = ref("");

    const dataPagos = ref<Pagos>({
      tienda: [],
    });

    async function validarPago(tokenParams: any) {
      await pagoStore.cargarPago(tokenParams);

      dataPagos.value = pagoStore.object.pago as Pagos;

      console.log("esperando pago");
      console.log(dataPagos);
      /*
      if (dataPagos.value && dataPagos.value.tienda) {
        console.log(dataPagos.value);
        console.log(dataPagos.value.tienda?.length);

        if (dataPagos.value.tienda?.length > 0) {
          if (dataPagos.value.tienda[0].status == "Entregado") {
            console.log("Intervalo limpiado");
            clearInterval(intervalId);

            dialogPropiedades.value = {
              dialog: true,
              mensajeTitulo: "Información de pago",
              mensajeCuerpo: "Su pago se ha registrado con éxito",
              correcto: true,
            };
          } else if (dataPagos.value.tienda[0].status == "Pago Pendiente") {
            clearInterval(intervalId);
            dialogPropiedades.value = {
              dialog: true,
              mensajeTitulo: "Información de pago",
              mensajeCuerpo: "Se generó un error en su pago",
              correcto: true,
            };
          } else {
            clearInterval(intervalId);
            dialogPropiedades.value = {
              dialog: true,
              mensajeTitulo: "Información de pago",
              mensajeCuerpo: "Se generó un error en su pago",
              correcto: true,
            };
            console.log("Pago incorrecto:");
            console.log(dataPagos.value.tienda[0]);
            console.log(dataPagos.value.tienda[0].status);
          }
        }
      }
      */
    }

    async function inicializar(
      idCertificadoParams: any,
      tokenParams: any,
      idTokenParams: any
    ) {
      token.value = tokenParams;
    }

    let intervalId: any = null;

    onIonViewDidEnter(async () => {
      const idCertificado = route.params.idCertificado;
      const tokenCert = route.params.tokenCertificado;
      const idTokenCert = route.params.idTokenCertificado;

      await inicializar(idCertificado, tokenCert, idTokenCert);
      //await validarPago(tokenCert);

      intervalId = setInterval(async () => {
        const tokenCert = route.params.tokenCertificado;
        await validarPago(tokenCert);
      }, 15000); // 10 segundos en milisegundos
    });

    onIonViewDidLeave(() => {
      console.log("Intervalo limpiado");
      clearInterval(intervalId); // Detener las peticiones cuando sales de la ventana
    });

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        router.push({ name: "certificadoEstatus" });
      }
    }

    return {
      colores,
      token,
      anim,
      PaymentLoading,
      PaymentSuccess,
      PaymentError,
      dialogPropiedades,
      cerrardialogPropiedades,
    };
  },
});
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
</style>
