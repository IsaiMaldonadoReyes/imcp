<template>
  <ion-page>
    <ion-content ref="contentRef">
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
            :src="token"
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
      <dialog-action
        :dialogView="dialogPropiedades.dialog"
        :dialog-title="dialogPropiedades.titulo"
        :dialog-content="dialogPropiedades.cuerpo"
        :dialog-route="dialogPropiedades.ruta"
        :dialog-colour="dialogPropiedades.color"
        :dialog-text-button="dialogPropiedades.boton"
        :dialog-speed="dialogPropiedades.velocidad"
        :dialog-loop="dialogPropiedades.repetir"
        @cerrarDialog="cerrardialogPropiedades"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  onIonViewDidLeave,
  IonDatetime,
} from "@ionic/vue";
import { VDatePicker, VDatePickerMonth } from "vuetify/lib/labs/components.mjs";
import { useRouter, Router, useRoute } from "vue-router";
import { usePagoStore } from "@/store/pago";
import DialogAction from "../helper/DialogAction.vue";

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
    DialogAction,
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

    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const getCurrentFormattedDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const dialogPropiedades = ref({
      dialog: false,
      titulo: "",
      cuerpo: "",
      ruta: "",
      color: "",
      boton: "",
      velocidad: 0,
      componente: "",
      repetir: false,
    });

    const idToken = ref(0);
    const token = ref("");
    const fechaActual = ref("");

    const dataPagos = ref<Pagos>({
      tienda: [],
    });

    async function validarPago(tokenParams: any, fecha: any) {
      await pagoStore.cargarPago(tokenParams, fecha);

      dataPagos.value = pagoStore.object.pago as Pagos;

      console.log("esperando pago");
      console.log(dataPagos);

      if (dataPagos.value && dataPagos.value.tienda) {
        console.log(dataPagos.value);
        console.log(dataPagos.value.tienda?.length);

        if (dataPagos.value.tienda?.length > 0) {
          const forma_pago = dataPagos.value.tienda[0].forma_pago;
          const status = dataPagos.value.tienda[0].status;

          console.log(forma_pago);
          console.log(status);

          switch (forma_pago) {
            case "Visa/Mastercard":
            case "Visa/Mastercard Banamex":
              switch (status) {
                case "Pagado":
                case "Enviado":
                case "Entregado":
                case "Pagado y facturado":
                case "Preparación":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Su pago se ha registrado con éxito, método de pago: ${forma_pago}`,
                    ruta: "payment-success",
                    color: colores.value.verdeBoton,
                    boton: "Aceptar",
                    velocidad: 1,
                    componente: "",
                    repetir: true,
                  };
                  clearInterval(intervalId);
                  break;
                case "Pago Pendiente":
                case "Incompleto":
                case "Cancelado":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Se generó un error en su pago, método de pago: ${forma_pago}`,
                    ruta: "payment-error",
                    color: colores.value.rojoIMPC,
                    boton: "Cerrar",
                    velocidad: 0.5,
                    componente: "",
                    repetir: true,
                  };
                  break;
              }
              break;

            case "American Express":
              switch (status) {
                case "Pagado":
                case "Enviado":
                case "Entregado":
                case "Pagado y facturado":
                case "Preparación":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Su pago se ha registrado con éxito, método de pago: ${forma_pago}`,
                    ruta: "payment-success",
                    color: colores.value.verdeBoton,
                    boton: "Aceptar",
                    velocidad: 1,
                    componente: "",
                    repetir: true,
                  };
                  clearInterval(intervalId);
                  break;
                case "Pago Pendiente":
                case "Incompleto":
                case "Cancelado":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Se generó un error en su pago, método de pago: ${forma_pago}`,
                    ruta: "payment-error",
                    color: colores.value.rojoIMPC,
                    boton: "Cerrar",
                    velocidad: 0.5,
                    componente: "",
                    repetir: true,
                  };
                  break;
              }
              break;

            case "Oxxo":
            case "7Eleven":
            case "Paypal":
              switch (status) {
                case "Pagado":
                case "Enviado":
                case "Entregado":
                case "Pagado y facturado":
                case "Preparación":
                case "Pago Pendiente":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Su pago se ha registrado con éxito, método de pago: ${forma_pago}`,
                    ruta: "payment-success",
                    color: colores.value.verdeBoton,
                    boton: "Aceptar",
                    velocidad: 1,
                    componente: "",
                    repetir: true,
                  };
                  clearInterval(intervalId);
                  break;
                case "Incompleto" || "Cancelado":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Se generó un error en su pago, método de pago: ${forma_pago}`,
                    ruta: "payment-error",
                    color: colores.value.rojoIMPC,
                    boton: "Cerrar",
                    velocidad: 0.5,
                    componente: "",
                    repetir: true,
                  };
                  break;
              }
              break;

            case "ReferenciaBanorte":
            case "ReferenciaBanamex":
              switch (status) {
                case "Pagado":
                case "Enviado":
                case "Entregado":
                case "Pagado y facturado":
                case "Preparación":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Su pago se ha registrado con éxito, método de pago: ${forma_pago}`,
                    ruta: "payment-success",
                    color: colores.value.verdeBoton,
                    boton: "Aceptar",
                    velocidad: 1,
                    componente: "",
                    repetir: true,
                  };
                  clearInterval(intervalId);
                  break;
                case "Incompleto":
                case "Cancelado":
                  dialogPropiedades.value = {
                    dialog: true,
                    titulo: "Información de pago",
                    cuerpo: `Se generó un error en su pago, método de pago: ${forma_pago}`,
                    ruta: "payment-error",
                    color: colores.value.rojoIMPC,
                    boton: "Cerrar",
                    velocidad: 0.5,
                    componente: "",
                    repetir: true,
                  };
                  break;
              }
              break;
          }
        }
      }
    }

    async function inicializar(
      idCertificadoParams: any,
      tokenParams: any,
      idTokenParams: any
    ) {
      token.value = tokenParams;

      token.value = `https://tienda.imcp.org.mx/api/datos_inv_dpc.php?token=${tokenParams}&debug=1&timestamp=${Date.now()}`;
    }

    let intervalId: any = null;

    onIonViewDidEnter(async () => {
      scrollToTop();
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      const idCertificado = route.params.idCertificado;
      const tokenCert = route.params.tokenCertificado;
      const idTokenCert = route.params.idTokenCertificado;

      token.value = "";
      fechaActual.value = "";

      await inicializar(idCertificado, tokenCert, idTokenCert);

      fechaActual.value = getCurrentFormattedDate();
      intervalId = setInterval(async () => {
        const tokenCert = route.params.tokenCertificado;

        await validarPago(tokenCert, fechaActual.value);
      }, 15000); // 10 segundos en milisegundos
    });

    onIonViewDidLeave(() => {
      token.value = "";
      clearInterval(intervalId); // Detener las peticiones cuando sales de la ventana
    });

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente != "") {
        router.push({ name: dialogPropiedades.value.componente });
      }
    }

    return {
      colores,
      token,
      dialogPropiedades,
      cerrardialogPropiedades,
      contentRef,
    };
  },
});
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
</style>
