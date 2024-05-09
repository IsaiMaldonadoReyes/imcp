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
              <v-icon color="grey-lighten-1" size="60">mdi-database-eye-off</v-icon>
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
              <v-card border class="ma-3" elevation="0">
                <v-card-text class="text-justify">
                  <template
                    v-for="(manifestacion, index) in itemH.raw.manifestaciones"
                    :key="index"
                    :value="itemH.raw.id_certificado"
                  >
                    <v-checkbox
                      :center-affix="true"
                      color="#468C00"
                      false-icon="mdi-checkbox-blank-outline"
                      true-icon="mdi-checkbox-marked"
                      v-model="
                        manifestacionListado[
                          `${manifestacion.label}_${itemH.raw.id_certificado}`
                        ]
                      "
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
                      <v-text-field
                        class="my-4"
                        clearable
                        hide-details="auto"
                        v-for="(value, index) in manifestacion.value"
                        :key="index"
                        :label="value"
                        :required="
                          manifestacionListado[
                            `${manifestacion.label}_${itemH.raw.id_certificado}_${manifestacion.value}`
                          ]
                        "
                        v-model="
                          manifestacionListado[
                            `${manifestacion.label}_${itemH.raw.id_certificado}_${value}`
                          ]
                        "
                      ></v-text-field>
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
              <v-icon class="mr-3" size="large"></v-icon>
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
              <v-icon class="mr-3" size="large"></v-icon>
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
        @cerrarDialog="cerrardialogPropiedades"
      />
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
  [key: string]: boolean;
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

    const permisosListado = ref<Permisos>({
      dataset: [],
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
    });

    async function limpiarFormulario() {
      permisosListado.value = {
        dataset: [],
      };
    }

    async function cargarPermisos() {
      permisosListado.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        intervaloSeccion: 0,
        nombreListado: "",
      };

      await manifestacionStore.cargarListadoPermisos();

      const listadoPermisos = manifestacionStore.object.listadoPermisos as Permisos;

      listadoPermisos.dataset.forEach((data) => {
        const manifestaciones: manifestaciones[] = [];
        // Iterar sobre cada permitido en el elemento actual
        data.permitidos.forEach((permitido) => {
          const info = data.info_solcitar.find((info) => info.value === permitido.label);
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
      const manifestacionesSeleccionadas = [];

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
        } else if (typeof value === "string") {
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

      for (const manifestacion of manifestacionesSeleccionadas) {
        const { label, id_certificado, valores } = manifestacion;
        const permisosByCertificado = permisosListado.value.dataset.find(
          (data) => data.id_certificado === parseInt(id_certificado, 10)
        );

        if (permisosByCertificado) {
          const manifestacionesByLabel = permisosByCertificado.manifestaciones.find(
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
            diferencias.forEach((diferencia: any) => {
              mensajeError += ` El campo '${diferencia}' debe ser ingresado del certificado: ${permisosByCertificado.disciplina} \n`;
            });
          }
        }
      }

      if (contadorSolicitudes == 0) {
        mensajeError += ` No fue seleccionada al menos una manifestación \n`;
      }

      if (mensajeError != "") {
        dialogPropiedades.value = {
          dialog: true,
          mensajeTitulo: "Verifique lo siguiente",
          mensajeCuerpo: mensajeError,
          correcto: false,
        };
        //const alert = await showAlert("Verifica lo siguiente", mensajeError);
        //await alert.present();
      } else {
        manifestacionStore.manifestacionesSeleccionadas = manifestacionesSeleccionadas;
        router.push({ name: "manifestacionCapacitacionListado" });
      }
    }

    async function guardarDatos() {
      try {
        const fechaActual = new Date();
        const currentYear = fechaActual.getFullYear();

        const storage = new Storage();
        storage.create();
        const rfc = await storage.get("rfc");

        const manifestacionesSeleccionadas = [];

        let mensajeError = "";

        for (const key in manifestacionListado.value) {
          const value = manifestacionListado.value[key];

          // Si el valor es booleano y es true
          if (typeof value === "boolean" && value) {
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
          } else if (typeof value === "string") {
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

        for (const manifestacion of manifestacionesSeleccionadas) {
          const { label, id_certificado, valores } = manifestacion;
          const permisosByCertificado = permisosListado.value.dataset.find(
            (data) => data.id_certificado === parseInt(id_certificado, 10)
          );

          if (permisosByCertificado) {
            const manifestacionesByLabel = permisosByCertificado.manifestaciones.find(
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
              diferencias.forEach((diferencia: any) => {
                mensajeError += ` El campo '${diferencia}' debe ser ingresado del certificado: ${permisosByCertificado.disciplina} \n`;
              });
            }
          }
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
          };
        } else {
          for (const manifestacion of manifestacionesSeleccionadas) {
            const { label, id_certificado, valores } = manifestacion;

            const permisosByCertificado = permisosListado.value.dataset.find(
              (data) => data.id_certificado === parseInt(id_certificado, 10)
            );

            if (permisosByCertificado) {
              const manifestacionesByLabel = permisosByCertificado.manifestaciones.find(
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
        }
      } catch (error) {}
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

      guardarDatos,
      es,

      permisosListado,
      eventosPermitidos,
      manifestacionListado,
      capturarCapacitaciones,
      dialogPropiedades,
      cerrardialogPropiedades,
      contentRef,
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
    border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
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
    border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
