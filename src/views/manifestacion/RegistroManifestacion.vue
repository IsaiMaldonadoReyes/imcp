<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Manifestaciones disponibles
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-card-text
          v-if="permisosListado.dataset.length > 0"
          class="text-grey-darken-1 text-justify"
        >
          Por favor, seleccione al menos uno de los siguientes certificados y
          haga clic en el botón "IR A CAPTURA DE CAPACITACIONES".
        </v-card-text>

        <v-data-iterator
          :items="permisosListado.dataset || []"
          :sort-by="sortBy"
          item-value="disciplina"
        >
          <template v-slot:no-data>
            <v-card
              border
              class="my-5 pa-10 text-center"
              color="transparent"
              elevation="0"
            >
              <v-icon color="grey-lighten-1" size="60"
                >mdi-database-eye-off</v-icon
              >
              <v-card-text class="text-grey-darken-1">
                No se encontró información.
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:default="{ items }">
            <v-card
              class="my-4 manifestaciones"
              elevation="0"
              border
              v-for="itemH in items"
              :key="itemH.raw.num_certificado"
            >
              <v-divider></v-divider>
              <v-card-text>
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <input
                        hidden
                        class="id_certificado"
                        :value="itemH.raw.id_certificado"
                      />
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Disciplina:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ itemH.raw.disciplina }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Sector:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ itemH.raw.sector }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Número de certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ itemH.raw.num_certificado }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Año de inicio de vigencia:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ itemH.raw.anhio_inicio_vigencia }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Año de fin de vigencia:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ itemH.raw.anhio_fin_vigencia }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
              <v-divider />
              <v-card
                v-if="
                  itemH.raw.manifestaciones &&
                  itemH.raw.manifestaciones.length > 0
                "
                border
                class="ma-3"
                elevation="0"
              >
                <v-card-text class="text-justify">
                  <template
                    v-for="(manifestacion, index) in itemH.raw.manifestaciones"
                    :key="index"
                    :value="itemH.raw.id_certificado"
                  >
                    <v-checkbox
                      v-model="
                        manifestacionListado[
                          `${manifestacion.label}_${itemH.raw.id_certificado}`
                        ]
                      "
                      :center-affix="true"
                      color="#468C00"
                      false-icon="mdi-checkbox-blank-outline"
                      true-icon="mdi-checkbox-marked"
                    >
                      <template v-slot:label>
                        Solicitar {{ manifestacion.label }}</template
                      >
                    </v-checkbox>
                    <template
                      v-if="
                        manifestacionListado[
                          `${manifestacion.label}_${itemH.raw.id_certificado}`
                        ]
                      "
                    >
                      <template
                        v-for="(value, index) in manifestacion.value"
                        :key="index"
                      >
                        <template
                          v-if="
                            value === 'DICTAMINA FISCALMENTE' ||
                            value === 'CONTADOR PÚBLICO CERTIFICADO'
                          "
                        >
                          <v-select
                            v-model="
                              manifestacionListado[
                                `${manifestacion.label}_${itemH.raw.id_certificado}_${value}`
                              ]
                            "
                            :label="value"
                            :items="['Si', 'No', 'No Aplica']"
                            class="my-4"
                            :required="
                              manifestacionListado[
                                `${manifestacion.label}_${itemH.raw.id_certificado}_${manifestacion.value}`
                              ]
                            "
                            hide-details="auto"
                            variant="outlined"
                          ></v-select>
                        </template>
                        <template v-else>
                          <v-text-field
                            v-model="
                              manifestacionListado[
                                `${manifestacion.label}_${itemH.raw.id_certificado}_${value}`
                              ]
                            "
                            :label="value"
                            class="my-4"
                            clearable
                            hide-details="auto"
                            variant="outlined"
                          ></v-text-field>
                        </template>
                      </template>
                    </template>
                  </template>
                </v-card-text>
              </v-card>
            </v-card>
          </template>
        </v-data-iterator>
        <div class="d-flex flex-column">
          <v-btn
            block
            class="mt-4"
            prepend-icon="mdi-content-save-edit-outline"
            rounded="large"
            size="large"
            text="IR A CAPTURA DE CAPACITACIONES"
            variant="flat"
            :color="colores.verdeBoton"
            @click="capturarCapacitaciones"
          >
            <template v-slot:prepend>
              <v-icon size="large"></v-icon>
            </template>
          </v-btn>
          <v-btn
            block
            class="mt-4"
            prepend-icon="mdi-content-save-off-outline"
            rounded="large"
            size="large"
            text="CANCELAR"
            variant="flat"
            :color="colores.rojoIMPC"
            :to="{ name: 'manifestacionListado' }"
          >
            <template v-slot:prepend>
              <v-icon size="large"></v-icon>
            </template>
          </v-btn>
        </div>
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
      <v-dialog v-model="loading">
        <div class="text-center">
          <v-progress-circular
            :size="60"
            :color="colores.rojoIMPC"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";

import { useManifestacionStore } from "@/store/manifestacion";
import { useRouter, Router, useRoute } from "vue-router";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { Storage } from "@ionic/storage";
import { es } from "date-fns/locale";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import DialogAction from "../helper/DialogAction.vue";

export interface Permisos {
  dataset: Dataset[];
  totalSize: number;
}

export interface Dataset {
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
  [key: string]: string;
}

// Define el tipo para cada manifestación
interface ValorManifestacion {
  label: string;
  value: string;
}

interface Manifestacion {
  label: string;
  id_certificado: string;
  valores: ValorManifestacion[];
}

// Define el tipo para los datos de permisos
interface Permiso {
  id_certificado: number;
  disciplina: string;
  manifestaciones: {
    label: string;
    value: string[];
  }[];
}

interface PermisosListado {
  dataset: Permiso[];
}

export default defineComponent({
  name: "RegistroManifestacion",
  components: {
    IonContent,
    IonPage,
    VDataTable,
    VDataIterator,
    DialogAction,
  },
  setup() {
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };
    const manifestacionListado = ref<ManifestacionSeleccionada>({});

    const route = useRoute();
    const router: Router = useRouter();

    const manifestacionStore = useManifestacionStore();

    let sortBy = ref([]);
    let sortDesc = ref("asc");
    const itemsPorPagina = ref(3);

    const eventosPermitidos = ref([]);
    const loading = ref(false);

    const permisosListado = ref<Permisos>({
      dataset: [],
      totalSize: 0,
    });

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

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

    async function limpiarFormulario() {
      permisosListado.value = {
        dataset: [],
        totalSize: 0,
      };
    }

    async function cargarPermisos() {
      loading.value = true;
      permisosListado.value = {
        dataset: [],
        totalSize: 0,
      };

      await manifestacionStore.cargarListadoPermisos();

      if (manifestacionStore.object.listadoPermisos.totalSize >= 0) {
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
              const label = Array.isArray(info.label)
                ? info.label
                : [info.label];
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
      loading.value = false;
    }

    onIonViewDidEnter(async () => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      await limpiarFormulario();
      await cargarPermisos();
    });

    async function capturarCapacitaciones() {
      let contadorSolicitudes = 0;
      let mensajeError = "";
      const manifestacionesSeleccionadas: Manifestacion[] = [];

      for (const key in manifestacionListado.value) {
        const value = manifestacionListado.value[key];

        // Si el valor es booleano y es true
        if (typeof value === "boolean" && value) {
          contadorSolicitudes++;
          // Extraemos la etiqueta y el id_certificado del key
          const [label, idCertificado] = key.split("_");

          // Buscamos si ya existe una manifestación con la misma label e id_certificado
          let manifestacionActual = manifestacionesSeleccionadas.find(
            (manifestacion) =>
              manifestacion.label === label &&
              manifestacion.id_certificado === idCertificado
          );

          // Si no existe, la creamos
          if (!manifestacionActual) {
            manifestacionActual = {
              label: label,
              id_certificado: idCertificado,
              valores: [],
            };
            manifestacionesSeleccionadas.push(manifestacionActual);
          }
        } else if (typeof value === "string" && value.trim() !== "") {
          // Si es un string
          // Añadimos el valor a la lista de valores de la manifestación actual
          const [label, idCertificado, texto] = key.split("_");

          if (value !== "") {
            const manifestacionActual = manifestacionesSeleccionadas.find(
              (manifestacion) =>
                manifestacion.label === label &&
                manifestacion.id_certificado === idCertificado
            );

            // Verificamos si encontramos una manifestación existente
            if (manifestacionActual) {
              manifestacionActual.valores.push({
                label: texto,
                value: value,
              });
            }
          }
        }
      }

      const erroresPorCertificado = new Map<string, string[]>();

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
            // Crear un conjunto con los valores de manifestacionesByLabel.value

            const manifestacionesSet = new Set(manifestacionesByLabel.value);

            // Filtrar los valores que están en manifestacionesByLabel.value pero no en valores
            const diferencias = manifestacionesByLabel.value.filter(
              (valor: any) => !valores.find((v: any) => v.label === valor)
            );

            // Mostrar las diferencias encontradas
            /*
            diferencias.forEach((diferencia: any) => {
              if (diferencia !== "REGISTRO CONTRIBUCIONES LOCALES") {
                mensajeError += ` El campo '${diferencia}' debe ser llenado en el certificado: <span style="color: black;">${permisosByCertificado.disciplina}</span> <br>`;
              }
            });
            */
            const diferenciasFiltradas = diferencias.filter(
              (diferencia: string) =>
                diferencia !== "REGISTRO CONTRIBUCIONES LOCALES"
            );

            if (diferenciasFiltradas.length > 0) {
              // Agrupar errores por certificado
              if (
                !erroresPorCertificado.has(permisosByCertificado.disciplina)
              ) {
                erroresPorCertificado.set(permisosByCertificado.disciplina, []);
              }
              erroresPorCertificado
                .get(permisosByCertificado.disciplina)!
                .push(...diferenciasFiltradas);
            }
          }
        }
      }

      erroresPorCertificado.forEach((campos, disciplina) => {
        mensajeError += `
    <p>Del certificado <span style="color: black;">${disciplina}</span> debe llenar los campos:</p>
    <ul>
      ${campos.map((campo) => `<li>${campo}</li>`).join("")}
    </ul>
  `;
      });

      if (contadorSolicitudes == 0) {
        mensajeError += ` No fue seleccionada al menos una manifestación <br>`;
      }

      if (mensajeError != "") {
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Verifique lo siguiente",
          cuerpo: mensajeError,
          ruta: "incorrect",
          color: colores.value.rojoIMPC,
          boton: "Cerrar",
          velocidad: 0.5,
          componente: "",
          repetir: false,
        };

        //const alert = await showAlert("Verifica lo siguiente", mensajeError);
        //await alert.present();
      } else {
        manifestacionStore.manifestacionesSeleccionadas =
          manifestacionesSeleccionadas;
        router.push({ name: "manifestacionCapacitacionListado" });
      }
    }

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente) {
        router.push({ name: dialogPropiedades.value.componente });
      }
    }

    return {
      colores,
      sortBy,
      sortDesc,
      itemsPorPagina,
      es,

      permisosListado,
      eventosPermitidos,
      manifestacionListado,
      capturarCapacitaciones,
      dialogPropiedades,
      cerrardialogPropiedades,
      contentRef,
      loading,
    };
  },
});
</script>

<style>
.lottie-container {
  height: 150px;
}

.dp__pointer {
  height: 56px;
}

.tb-grados thead {
  font-size: 0.875rem;
}

@media screen and (max-width: 600px) {
  .tb-grados thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .tb-grados.v-data-table td {
    border-bottom: thin solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    display: grid;
    text-align: justify;
    line-height: none;
    height: auto !important;
  }

  .tb-grados.v-data-table td::before {
    content: attr(data-label);
  }

  .tb-grados.v-data-table td:last-child {
    border-bottom: 0;
  }

  .tb-grados.v-data-table tr:not(:first-child) > td:first-child {
    border-top: medium solid
      rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
