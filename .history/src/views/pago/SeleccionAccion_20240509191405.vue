<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container fluid>
        <v-card color="transparent" elevation="0">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Pagar certificado
            </v-card-title>
          </v-card-item>
        </v-card>
        <div class="d-flex flex-column">
          <v-btn
            block
            class="mt-4"
            prepend-icon="mdi-folder-information-outline"
            rounded="large"
            size="x-large"
            text="1. ACTUALIZAR DATOS"
            variant="flat"
            :color="estatusBotones == '1' ? colores.verdeBoton : colores.grisOscuro"
            @click="actualizarDatos"
            :disabled="estatusBotones !== '1'"
          >
            <template v-slot:prepend>
              <v-icon size="large"></v-icon>
            </template>
          </v-btn>

          <v-btn
            block
            class="mt-4"
            prepend-icon="mdi-account-credit-card-outline"
            rounded="large"
            size="x-large"
            text="2. REALIZAR PAGO"
            variant="flat"
            :color="estatusBotones === '2' ? colores.verdeBoton : colores.grisOscuro"
            @click="realizarPago"
            :disabled="estatusBotones !== '2'"
          >
            <template v-slot:prepend>
              <v-icon class="mr-3" size="large"></v-icon>
            </template>
          </v-btn>
        </div>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { useRouter, Router, useRoute } from "vue-router";

export default defineComponent({
  name: "SeleccionAccion",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const route = useRoute();
    const router: Router = useRouter();
    const idCertificadoActualizacion = ref(0);
    const tokenCertificadoRef = ref("");
    const idTokenCertificadoRef = ref(0);
    const estatusBotones = ref("");

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    async function cargarSeleccion(
      idCertificado: any,
      estatus: any,
      tokenParams: any,
      idTokenParams: any
    ) {
      idCertificadoActualizacion.value = idCertificado;
      estatusBotones.value = estatus;
      tokenCertificadoRef.value = tokenParams;
      idTokenCertificadoRef.value = idTokenParams;
    }

    function actualizarDatos() {
      router.push({
        name: "actualizacionDatos",
        params: {
          idCertificado: idCertificadoActualizacion.value,
          tokenCertificado: tokenCertificadoRef.value,
          idToken: idTokenCertificadoRef.value,
        },
      });
    }

    function realizarPago() {
      router.push({
        name: "tarjetaDatos",
        params: {
          idCertificado: idCertificadoActualizacion.value,
          estatus: "2",
          tokenCertificado: tokenCertificadoRef.value,
          idToken: idTokenCertificadoRef.value,
        },
      });
    }

    onIonViewDidEnter(async () => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      const idCertificado = route.params.idCertificado;
      const estatusAccion = route.params.estatus;
      const tokenCerti = route.params.tokenCertificado;
      const idTokenCerti = route.params.idToken;

      await cargarSeleccion(idCertificado, estatusAccion, tokenCerti, idTokenCerti);
    });

    return {
      colores,
      show,
      idCertificadoActualizacion,
      estatusBotones,
      tokenCertificadoRef,
      actualizarDatos,
      realizarPago,
      contentRef,
    };
  },
});
</script>
