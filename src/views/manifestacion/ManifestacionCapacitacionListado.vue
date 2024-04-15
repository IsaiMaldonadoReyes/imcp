<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container>
        <v-card border class="mb-3" color="transparent" elevation="0">
          <v-card class="py-1" elevation="0" border rounded="0">
            <v-card-item>
              <v-card-title
                class="text-uppercase text-center"
                style="white-space: normal"
              >
                Listado de capacitaciones externas
              </v-card-title>
            </v-card-item>
          </v-card>
          <v-text-field
            v-model="busquedaAvisoCapacitacion"
            class="ma-3"
            clearable
            density="comfortable"
            hide-details
            placeholder="Buscar evento"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
          />
          <v-card border class="ma-3" elevation="0">
            <v-data-table
              :headers="encabezadosEvento"
              :items-per-page="avisosCapacitacionPorPagina"
              :items="listadoCapacitaciones.dataset"
              :page="paginaAvisoCapacitacion"
              :search="busquedaAvisoCapacitacion"
              item-value="EventosNombreEvento"
              style="background-color: transparent"
              class="tb-avisos pa-2"
            >
              <template v-slot:top="{ pageCount }">
                <v-divider />
                <div
                  class="text-center my-3 mx-3"
                  v-if="listadoCapacitaciones.dataset.length > 4"
                >
                  <v-select
                    v-model="avisosCapacitacionPorPagina"
                    :items="[
                      { value: 1, title: '1' },
                      { value: 3, title: '3' },
                      { value: 5, title: '5' },
                      { value: 10, title: '10' },
                      { value: -1, title: 'Todos' },
                    ]"
                    class="my-2"
                    hide-details
                    label="Eventos por página"
                    variant="solo"
                  ></v-select>
                  <v-pagination
                    v-model="paginaAvisoCapacitacion"
                    :active-color="colores.rojoIMPC"
                    :color="colores.grisOscuro"
                    :length="pageCount"
                    :show-first-last-page="true"
                    ellipsis="..."
                    next-icon="mdi-arrow-right"
                    prev-icon="mdi-arrow-left"
                    size="small"
                    total-visible="1"
                    variant="flat"
                    v-if="listadoCapacitaciones.dataset.length > 1"
                  >
                    <template v-slot:item="{ page }">
                      <div
                        class="mx-2 my-1 text-subtitle-1 text-grey-darken-1 font-weight-bold"
                      >
                        {{ page }} de {{ pageCount }}
                      </div>
                    </template>
                  </v-pagination>
                </div>
              </template>
              <template v-slot:[`item`]="{ item }">
                <tr class="v-data-table__tr">
                  <td
                    v-for="encabezado in encabezadosEvento"
                    :key="encabezado.key"
                    :data-label="encabezado.title"
                    class="v-data-table__td v-data-table-column--align-start text-body-2 text-medium-emphasis py-1"
                  >
                    <v-chip
                      :color="getColor(item[encabezado.key])"
                      variant="outlined"
                      size="small"
                      label
                      style="width: fit-content"
                      class="mr-2"
                      v-if="encabezado.key == 'status'"
                    >
                      <v-icon size="x-small" class="mr-2">mdi-circle</v-icon>
                      {{ item[encabezado.key] }}
                    </v-chip>
                    <span
                      v-else-if="encabezado.key == 'eventos_fecha_inicio'"
                      class="text-body-2 font-weight-bold"
                    >
                      {{
                        item[encabezado.key] === "0000-00-00 00:00:00"
                          ? "Fecha inválida"
                          : formatearFecha(item[encabezado.key])
                      }}
                    </span>

                    <span v-else class="text-body-2 font-weight-bold">
                      {{ item[encabezado.key] }}
                    </span>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>
                <v-card
                  border
                  class="my-5 pa-10 text-center"
                  color="transparent"
                  elevation="0"
                >
                  <v-icon color="grey-lighten-1" size="60">
                    mdi-database-eye-off
                  </v-icon>
                  <v-card-text class="text-grey-darken-1">
                    No se encontraron eventos que coincidan con la búsqueda.
                  </v-card-text>
                </v-card>
              </template>
              <template v-slot:bottom="{ pageCount }">
                <v-divider />
                <div
                  class="text-center my-3 mx-3"
                  v-if="listadoCapacitaciones.dataset.length > 4"
                >
                  <v-select
                    v-model="avisosCapacitacionPorPagina"
                    :items="[
                      { value: 1, title: '1' },
                      { value: 3, title: '3' },
                      { value: 5, title: '5' },
                      { value: 10, title: '10' },
                      { value: -1, title: 'Todos' },
                    ]"
                    class="my-2"
                    hide-details
                    label="Eventos por página"
                    variant="solo"
                  ></v-select>
                  <v-pagination
                    v-model="paginaAvisoCapacitacion"
                    :active-color="colores.rojoIMPC"
                    :color="colores.grisOscuro"
                    :length="pageCount"
                    :show-first-last-page="true"
                    ellipsis="..."
                    next-icon="mdi-arrow-right"
                    prev-icon="mdi-arrow-left"
                    size="small"
                    total-visible="1"
                    variant="flat"
                    v-if="listadoCapacitaciones.dataset.length > 1"
                  >
                    <template v-slot:item="{ page }">
                      <div
                        class="mx-2 my-1 text-subtitle-1 text-grey-darken-1 font-weight-bold"
                      >
                        {{ page }} de {{ pageCount }}
                      </div>
                    </template>
                  </v-pagination>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
        <v-card border class="mb-3" color="transparent" elevation="0">
          <v-card border class="ma-3" elevation="0">
            <v-card-text class="text-justify">
              <span class="text-body text-grey-darken-1">
                Si usted cuenta con capacitaciones externas al colegio que no
                aparezcan en este listado, puede agregarlas dando clic en el
                siguiente botón
              </span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                class="text-none"
                prepend-icon="mdi-note-plus-outline"
                rounded="large"
                size="large"
                text="NUEVA CAPACITACIÓN EXTERNA"
                variant="flat"
                :color="colores.verdeBoton"
                :to="{ name: 'manifestacionRegistroCapacitacion' }"
              >
                <template v-slot:prepend>
                  <v-icon class="mr-3" size="large"></v-icon>
                </template>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
        <v-card border class="mb-3" color="transparent" elevation="0">
          <v-card border class="ma-3" elevation="0">
            <v-card-text class="text-justify">
              <span class="text-body text-grey-darken-1">
                Si usted no cuenta con manifestaciones adicionales de clic en el
                siguiente botón
              </span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                class="text-none"
                prepend-icon="mdi-calendar-end"
                rounded="large"
                size="large"
                text="FINALIZAR MANIFESTACIÓN"
                variant="flat"
                :color="colores.rojoIMPC"
                @click="guardarDatos"
              >
                <template v-slot:prepend>
                  <v-icon class="mr-3" size="large"></v-icon>
                </template>
              </v-btn>
            </v-card-actions>
          </v-card>
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
            :animationData="CorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <lottie-animation
            v-else
            ref="anim"
            :animationData="IncorrectAnimation"
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
              >Continuar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  alertController,
} from "@ionic/vue";
import { useManifestacionStore } from "@/store/manifestacion";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { Storage } from "@ionic/storage";
import { useRouter, Router, useRoute } from "vue-router";
//import MobileTableHelper from "@/components/MobileTableHelper.vue";
import { LottieAnimation } from "lottie-web-vue";

import CorrectAnimation from "../../assets/images/correct.json";
import IncorrectAnimation from "../../assets/images/incorrect.json";

export interface Capacitaciones {
  dataset: Dataset[];
  totalSize: number;
  pageSize: number;
  intervaloSeccion: number;
  nombreListado: string;
}

export interface Dataset {
  externo_evento_id: number;
  usuario_id: any;
  cuentas_usuarios_id: number;
  id_colegio: number;
  nombre_evento: string;
  eventos_sede: string;
  expositor: string;
  eventos_fecha_inicio: string;
  eventos_fecha_fin: string;
  comentarios_autorizacion: string;
  comentarios_rechazo: string;
  telefono: string;
  email: string;
  status: string;
  origen: any;
  datecreation: string;
  externo_archivos_id: string;
  externo_puntos_id: string;
  archivo: any;
  status_archivo: string;
  disiplinas_id: number;
  puntos: number;
  horas: number;
  modalidad: string;
  status_puntos: string;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  expositor_status: string;
  externo_archivos: ExternoArchivo[];
  externo_puntos: ExternoPunto[];
}

export interface ExternoArchivo {
  externoArchivosId: number;
  externoEventoId: number;
  status: string;
}

export interface ExternoPunto {
  externoPuntosId: number;
  externoEventoId: number;
  disiplinasId: number;
  disiplinas: string;
  puntos: number;
  horas: number;
  modalidad: string;
  status: string;
}

export interface Permisos {
  dataset: DatasetPermisos[];
  totalSize: number;
  pageSize: number;
  intervaloSeccion: number;
  nombreListado: string;
}

export interface DatasetPermisos {
  cuentas_usuarios_id: number;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_rfc: string;
  id_sector: number;
  registro_agaff: string;
  registro_imss: string;
  id_certificado: number;
  id_tipo: number;
  id_tipo_certificado: number;
  id_certificado_dis: number;
  num_certificado: string;
  fecha_vigencia: string;
  fecha_inicio: string;
  status: string;
  anhio_inicio_vigencia: string;
  anhio_fin_vigencia: string;
  status_certificado: string;
  permitidos: Permitido[];
  info_solcitar: InfoSolcitar[];
  sector: string;
  disciplina: string;
  manifestaciones: manifestaciones[];
}

export interface Permitido {
  label: string;
}

export interface InfoSolcitar {
  value: string;
  label: any;
}

export interface manifestaciones {
  value: any;
  label: any;
}

export interface ManifestacionSeleccionada {
  [key: string]: boolean;
}

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  return alert;
};

export default defineComponent({
  name: "ManifestacionCapacitacionExterna",
  components: {
    IonContent,
    IonPage,
    VDataTable,
    LottieAnimation,
  },
  setup() {
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const manifestacionStore = useManifestacionStore();

    const route = useRoute();
    const router: Router = useRouter();

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

    const encabezadosEvento = ref([
      { title: "Especialidad", key: "modalidad" },
      { title: "Fecha", key: "eventos_fecha_inicio" },
      { title: "Lugar", key: "eventos_sede" },
      { title: "Puntos generados", key: "puntos" },
      { title: "Origen", key: "origen" },
      { title: "Estatus", key: "status" },
    ]);

    const avisosCapacitacionPorPagina = ref(5);
    const paginaAvisoCapacitacion = ref(1);
    const busquedaAvisoCapacitacion = ref("");

    const options = ref({
      indexAxis: "x",
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const listadoCapacitaciones = ref<Capacitaciones>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      intervaloSeccion: 0,
      nombreListado: "",
    });

    const getColor = (status: string) => {
      switch (status) {
        case "Solicitud":
          return "#FF7F00";
        case "Revisión":
          return "#0080FF";
        case "Autorizado":
          return "#85B201";
        case "Rechazado":
          return "#FE4948";
      }
    };

    const permisosListado = ref<Permisos>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      intervaloSeccion: 0,
      nombreListado: "",
    });

    async function cargarPermisos() {
      permisosListado.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        intervaloSeccion: 0,
        nombreListado: "",
      };

      await manifestacionStore.cargarListadoPermisos();

      const listadoPermisos = manifestacionStore.object
        .listadoPermisos as Permisos;

      listadoPermisos.dataset.forEach((data) => {
        const manifestaciones: manifestaciones[] = [];
        // Iterar sobre cada permitido en el elemento actual
        data.permitidos.forEach((permitido) => {
          const info = data.info_solcitar.find(
            (info) => info.value === permitido.label
          );
          if (info) {
            // Verificar si label es un array o un string
            const label = Array.isArray(info.label) ? info.label : [info.label];
            manifestaciones.push({
              value: label,
              label: permitido.label,
            });
          } else {
            // Si no se encuentra la información, asignar un array vacío
            manifestaciones.push({
              value: [],
              label: permitido.label,
            });
          }
        });
        // Asignar las manifestaciones al elemento actual
        data.manifestaciones = manifestaciones;
      });

      permisosListado.value = listadoPermisos;
    }

    async function cargarDashboard() {
      listadoCapacitaciones.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        intervaloSeccion: 0,
        nombreListado: "",
      };

      try {
        await manifestacionStore.cargarListadoCapacitacionExterna();

        listadoCapacitaciones.value = manifestacionStore.object
          .listado as Capacitaciones;
      } catch (error) {}
    }

    async function guardarDatos() {
      const fechaActual = new Date();
      const currentYear = fechaActual.getFullYear();

      const storage = new Storage();
      storage.create();
      const rfc = await storage.get("rfc");

      const manifestacionesSeleccionadas =
        manifestacionStore.manifestacionesSeleccionadas;

      for (const manifestacion of manifestacionesSeleccionadas) {
        const { label, id_certificado, valores } = manifestacion;

        const permisosByCertificado = permisosListado.value.dataset.find(
          (data) => data.id_certificado === parseInt(id_certificado, 10)
        );

        if (permisosByCertificado) {
          const manifestacionesByLabel =
            permisosByCertificado.manifestaciones.find(
              (data) => data.label == label
            );

          if (manifestacionesByLabel) {
            // cuando una manifestación no tiene campos que llenar
            if (manifestacionesByLabel.value.length == valores.length) {
              const formData = new FormData();
              formData.append("solicitudes[cuenta_rfc]", rfc);
              formData.append(
                "solicitudes[id_sector]",
                permisosByCertificado.id_sector.toString()
              );
              formData.append("solicitudes[tipo_solicitud]", label);
              formData.append("solicitudes[anhio]", currentYear.toString());
              formData.append("solicitudes[status_solicitud]", "Solicitada");
              formData.append(
                "solicitudes[catalogo_especialidad_id]",
                permisosByCertificado.id_certificado_dis.toString()
              );
              formData.append("solicitudes[status]", "Activo");

              if (manifestacionesByLabel.value.length == 0) {
                formData.append("solicitudes[registro_contribuciones]", "");
                formData.append("solicitudes[contador_public]", "");
                formData.append("solicitudes[numero_asociado]", "");
                formData.append("solicitudes[dictamina_fiscalmente]", "");
              } else {
                for (const valor of valores) {
                  if (valor.label == "REGISTRO CONTRIBUCIONES LOCALES") {
                    formData.append(
                      "solicitudes[registro_contribuciones]",
                      valor.value
                    );
                  }
                  if (valor.label == "DICTAMINA FISCALMENTE") {
                    formData.append("dictamina_fiscalmente]", valor.value);
                  }
                  if (valor.label == "CONTADOR PÚBLICO CERTIFICADO") {
                    formData.append("contador_public]", valor.value);
                  }
                  if (valor.label == "ASOCIADO NÚMERO") {
                    formData.append("numero_asociado]", valor.value);
                  }
                }
              }

              await manifestacionStore.registrarManifestacion(formData);
            }
          }
        }
      }

      dialogPropiedades.value = {
        dialog: true,
        mensajeTitulo: "Su manifestación ha sido creada",
        mensajeCuerpo:
          "Se notificará cuando sea autorizada para que pueda descargarla",
        correcto: true,
      };

      /*
      const alert = await showAlert(
        "Su manifestación ha sido creada",
        "Se notificará cuando esté autorizada para que pueda descargarla"
      );

      if (alert) {
        await alert.present();
        await alert.onDidDismiss();

        router.push({ name: "manifestacionListado" });
      }
      */
    }

    function formatearFecha(dateString: any) {
      const date = new Date(dateString);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    onIonViewDidEnter(async () => {
      scrollToTop();
      cargarDashboard();
      await cargarPermisos();
    });

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        router.push({ name: "manifestacionListado" });
      }
    }

    return {
      colores,
      options,
      listadoCapacitaciones,
      encabezadosEvento,
      avisosCapacitacionPorPagina,
      paginaAvisoCapacitacion,
      busquedaAvisoCapacitacion,
      getColor,
      guardarDatos,
      anim,
      dialogPropiedades,
      CorrectAnimation,
      IncorrectAnimation,
      cerrardialogPropiedades,
      contentRef,
      formatearFecha,
    };
  },
});
</script>

<style>
.lottie-container {
  height: 150px;
}

.v-btn[aria-selected="false"] .v-btn__content {
  color: #333333 !important; /* Cambia el color del texto a verde */
}

.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}

.rating-values {
  margin-left: 10px;
  min-width: 65px;
}

.tb-avisos thead {
  font-size: 0.875rem;
}

@media screen and (max-width: 600px) {
  .tb-avisos thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .tb-avisos.v-data-table td {
    border-bottom: thin solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    display: grid;
    text-align: justify;
    line-height: none;
    height: auto !important;
  }

  .tb-avisos.v-data-table td::before {
    content: attr(data-label);
  }

  .tb-avisos.v-data-table td:last-child {
    border-bottom: 0;
  }

  .tb-avisos.v-data-table tr:not(:first-child) > td:first-child {
    border-top-width: 10px;
    border-top-style: solid;
    border-top-color: #eeeeee;
  }
}
</style>
