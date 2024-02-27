<template>
  <ion-page>
    <ion-content>
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
        <v-card color="transparent" class="mx-auto my-4" elevation="0">
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="x-large"
              text="ACTUALIZAR DATOS"
              variant="flat"
              :color="
                estatusBotones == '1' ? colores.verdeBoton : colores.grisOscuro
              "
              :to="{
                name: 'actualizacionDatos',
                params: { idCertificado: idCertificadoActualizacion },
              }"
              :disabled="estatusBotones !== '1'"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
          <br />
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="x-large"
              text="REALIZAR PAGO"
              variant="flat"
              :color="
                estatusBotones === '2' ? colores.verdeBoton : colores.grisOscuro
              "
              :to="{
                name: 'tarjetaDatos',
                params: {
                  idCertificado: idCertificadoActualizacion,
                  estatus: 2,
                },
              }"
              :disabled="estatusBotones !== '2'"
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
    const estatusBotones = ref("");

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    function cargarSeleccion(idCertificado: any, estatus: any) {
      idCertificadoActualizacion.value = idCertificado;

      estatusBotones.value = estatus;
    }

    onIonViewDidEnter(() => {
      const idCertificado = route.params.idCertificado;
      const estatusAccion = route.params.estatus;

      cargarSeleccion(idCertificado, estatusAccion);
    });

    return {
      colores,
      show,
      idCertificadoActualizacion,
      estatusBotones,
    };
  },
});
</script>
