<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title class="text-center" style="white-space: normal">
              Pagar certificado
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card color="transparent" rounded="lg" class="mx-auto my-4" elevation="0">
          <v-btn
            block
            class="text-none"
            prepend-icon="mdi-file-download-outline"
            size="large"
            text="ACTUALIZAR DATOS"
            variant="flat"
            :color="colores.verdeBoton"
            :to="{
              name: 'actualizacionDatos',
              params: { idCertificado: idCertificadoActualizacion },
            }"
          >
            <template v-slot:prepend>
              <v-icon class="mr-3" size="large"></v-icon>
            </template>
          </v-btn>

          <br />
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="large"
              text="REALIZAR PAGO"
              variant="flat"
              :color="colores.rojoIMPC"
              :to="{
                name: 'seleccionPagoCertificado',
                params: { idCertificado: idCertificadoActualizacion },
              }"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SeleccionAccion",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const route = useRoute();
    const idCertificadoActualizacion = ref(0);

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    function cargarSeleccion(idCertificado: any) {
      idCertificadoActualizacion.value = idCertificado;
    }

    onIonViewDidEnter(() => {
      const idCertificado = route.params.idCertificado;

      cargarSeleccion(idCertificado);
    });

    return {
      colores,
      show,
      idCertificadoActualizacion,
    };
  },
});
</script>
