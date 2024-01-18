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
              Mi cuenta
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-form v-model="isValid" lazy-validation ref="formEl">
          <v-card class="my-3" elevation="0" border>
            <!--v-card-title>
              <span class="font-weight-bold"
                >Datos personales</span
              ></v-card-title
            -->
            <v-card-text>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Nombre *"
                placeholder="Nombre(s)"
                v-model="dataCuenta.cuenta_nombre"
                readonly
                selectable="false"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Apellido paterno *"
                placeholder="Apellido paterno"
                v-model="dataCuenta.cuenta_apaterno"
                readonly
                selectable="false"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Apellido materno *"
                placeholder="Apellido materno"
                v-model="dataCuenta.cuenta_amatarno"
                readonly
                selectable="false"
              ></v-text-field>

              <v-text-field
                class="my-4"
                hide-details="auto"
                label="RFC *"
                placeholder="RFC"
                v-model="dataCuenta.cuenta_rfc"
                readonly
                selectable="false"
              ></v-text-field>

              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Email *"
                placeholder="Email"
                v-model="dataCuenta.cuenta_email"
                readonly
                selectable="false"
              ></v-text-field>

              <v-text-field
                class="my-4"
                hide-details="auto"
                label="AGAFF *"
                placeholder="Dato AGAFF"
                v-model="dataCuenta.registro_agaff"
                readonly
                selectable="false"
              ></v-text-field>

              <v-text-field
                class="my-4"
                hide-details="auto"
                label="IMSS *"
                placeholder="Dato IMMS"
                v-model="dataCuenta.registro_imss"
                readonly
                selectable="false"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Contraseña *"
                placeholder="Contraseña"
                variant="outlined"
                v-model="dataCuenta.password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="[rules.validPassword]"
                @click:append-inner="show1 = !show1"
              ></v-text-field>
              <v-checkbox
                :center-affix="true"
                :color="colores.verdeBoton"
                hide-details
                true-icon="mdi-bell-ring"
                v-model="dataCuenta.enviado"
              >
                <template v-slot:label>Recibir notificaciones</template>
              </v-checkbox>
            </v-card-text>
          </v-card>
        </v-form>

        <v-card color="transparent" class="mx-auto my-4" elevation="0">
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-content-save-edit-outline"
              rounded="large"
              size="large"
              text="GUARDAR"
              variant="flat"
              :color="colores.verdeBoton"
              @click="actualizarRegistro"
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
              prepend-icon="mdi-content-save-off-outline"
              rounded="large"
              size="large"
              text="CANCELAR"
              variant="flat"
              :color="colores.rojoIMPC"
              :to="{ name: 'dashboard' }"
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
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  alertController,
} from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCuentaStore } from "@/store/cuenta";
import { useRouter, Router } from "vue-router";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  await alert.present();
};

export interface InformacionUsuario {
  informacion: Informacion;
}

export interface Informacion {
  cuentas_usuarios_id: number;
  id_sector: number;
  id_tipo_origen: number;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_sexo: string;
  cuenta_email: string;
  cuenta_civil: string;
  lugar_nacimiento: string;
  registro_agaff: string;
  anhio_titulo: string;
  tipo_ususario: string;
  expositor: string;
  status: string;
  registro_imss: string;
  infonavit: string;
  datecreation: string;
  dateupdate: string;
  id_colegio: number;
  organismo: string;
  cuenta_pagado: number;
  cuenta_socio: string;
  cuenta_status: string;
  articulo: string;
  anhio_nacimiento: string;
  nombre_colegio: string;
  dato_facturacion_id: number;
  nombre: string;
  rfc: string;
  cp: string;
  calle: string;
  colinia: string;
  delegacion: string;
  ciudad: string;
  estado: string;
  tipo_persona: any;
  regimen_fiscal_id: any;
  direccion_id_personal: number;
  num_personal: string;
  direccion_nombre_personal: string;
  direccion_calle_numero_personal: string;
  direccion_cp_personal: string;
  direccion_colonia_personal: string;
  direccion_delegacion_personal: string;
  direccion_estado_personal: string;
  direccion_id_empresa: number;
  num_empresa: string;
  direccion_nombre_empresa: string;
  direccion_calle_numero_empresa: string;
  direccion_cp_empresa: string;
  direccion_colonia_empresa: string;
  direccion_delegacion_empresa: string;
  direccion_estado_empresa: string;
}

export interface InformacionUsuarioArray {
  info: Info[];
}

export interface Info {
  cuentas_usuarios_id: number;
  id_colegio: number;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_email: string;
  registro_agaff: string;
  registro_imss: string;
  expositor: string;
  articulo: string;
  status: string;
  users_usuarios_usuario_id: number;
  users_usuarios_usuario_nombre: string;
  users_usuarios_usuario_apaterno: string;
  users_usuarios_usuario_amaterno: string;
  users_usuarios_usuario_alias: string;
  users_usuarios_usuario_email: string;
  users_usuarios_rfc_usuario: string;
  users_usuarios_usuario_fecha_contrasena: string;
  usuario_status_acceso: string;
  usuario_imagen: string;
  enviado: string;
}

export default defineComponent({
  name: "cuenta",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const pagoStore = usePagoStore();
    const cuentaStore = useCuentaStore();
    const router: Router = useRouter();
    const regexPassword = /^.{8,}$/;
    const isValid = ref(true);
    const formEl = ref<any>(null);
    const show1 = ref(false);

    const rules = {
      validPassword: (v: string) => {
        if (!v || v.trim().length === 0) {
          return true; // Si el campo está vacío, la validación se considera exitosa
        }
        return regexPassword.test(v) || "Contraseña no válida";
      },
      required: (v: string) => !!v || "Este campo es requerido",
    };

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const dataContacto = ref<InformacionUsuario>({
      informacion: {
        cuentas_usuarios_id: 0,
        id_sector: 0,
        id_tipo_origen: 0,
        cuenta_rfc: "",
        cuenta_nombre: "",
        cuenta_apaterno: "",
        cuenta_amatarno: "",
        cuenta_sexo: "",
        cuenta_email: "",
        cuenta_civil: "",
        lugar_nacimiento: "",
        registro_agaff: "",
        anhio_titulo: "",
        tipo_ususario: "",
        expositor: "",
        status: "",
        registro_imss: "",
        infonavit: "",
        datecreation: "",
        dateupdate: "",
        id_colegio: 0,
        organismo: "",
        cuenta_pagado: 0,
        cuenta_socio: "",
        cuenta_status: "",
        articulo: "",
        anhio_nacimiento: "",
        nombre_colegio: "",
        dato_facturacion_id: 0,
        nombre: "",
        rfc: "",
        cp: "",
        calle: "",
        colinia: "",
        delegacion: "",
        ciudad: "",
        estado: "",
        tipo_persona: null,
        regimen_fiscal_id: null,
        direccion_id_personal: 0,
        num_personal: "",
        direccion_nombre_personal: "",
        direccion_calle_numero_personal: "",
        direccion_cp_personal: "",
        direccion_colonia_personal: "",
        direccion_delegacion_personal: "",
        direccion_estado_personal: "",
        direccion_id_empresa: 0,
        num_empresa: "",
        direccion_nombre_empresa: "",
        direccion_calle_numero_empresa: "",
        direccion_cp_empresa: "",
        direccion_colonia_empresa: "",
        direccion_delegacion_empresa: "",
        direccion_estado_empresa: "",
      },
    });

    const dataInformacion = ref<InformacionUsuarioArray>({
      info: [],
    });

    const dataCuenta = ref({
      cuentas_usuarios_id: 0,
      cuenta_nombre: "",
      cuenta_apaterno: "",
      cuenta_amatarno: "",
      cuenta_email: "",
      cuenta_rfc: "",
      registro_agaff: "",
      registro_imss: "",
      users_usuarios_usuario_id: 0,
      password: "",
      enviado: false,
    });

    async function cargarContacto() {
      dataCuenta.value = {
        cuentas_usuarios_id: 0,
        cuenta_nombre: "",
        cuenta_apaterno: "",
        cuenta_amatarno: "",
        cuenta_email: "",
        cuenta_rfc: "",
        registro_agaff: "",
        registro_imss: "",
        users_usuarios_usuario_id: 0,
        password: "",
        enviado: false,
      };

      try {
        await pagoStore.cargarContacto();

        await pagoStore.cargarContactoInformacion();

        dataContacto.value = pagoStore.object.contacto as InformacionUsuario;

        dataInformacion.value = pagoStore.object
          .informacion as InformacionUsuarioArray;

        dataCuenta.value.cuentas_usuarios_id =
          dataContacto.value.informacion.cuentas_usuarios_id;
        dataCuenta.value.cuenta_nombre =
          dataContacto.value.informacion.cuenta_nombre;
        dataCuenta.value.cuenta_apaterno =
          dataContacto.value.informacion.cuenta_apaterno;
        dataCuenta.value.cuenta_amatarno =
          dataContacto.value.informacion.cuenta_amatarno;
        dataCuenta.value.cuenta_email =
          dataContacto.value.informacion.cuenta_email;
        dataCuenta.value.cuenta_rfc = dataContacto.value.informacion.cuenta_rfc;
        dataCuenta.value.registro_agaff =
          dataContacto.value.informacion.registro_agaff;
        dataCuenta.value.registro_imss =
          dataContacto.value.informacion.registro_imss;
        dataCuenta.value.users_usuarios_usuario_id =
          dataInformacion.value.info[0].users_usuarios_usuario_id;

        dataCuenta.value.enviado =
          dataInformacion.value.info[0].enviado == "Si" ? true : false;
      } catch (error) {
        console.log(error);
      }
    }

    async function actualizarRegistro() {
      try {
        const isValidForm = await formEl.value?.validate();
        if (isValidForm.valid) {
          const formData = new URLSearchParams();

          /*formData.append("datos[cuenta_rfc]", "CACX610315BD1");
          formData.append("datos[cuenta_nombre]", "Abel");
          formData.append("datos[cuenta_apaterno]", "Castro");
          formData.append("datos[cuenta_amatarno]", "Castro");
          formData.append("datos[cuenta_email]", "abel_asociados@hotmail.com");
          formData.append("datos[registro_agaff]", "07853");
          formData.append("datos[registro_imss]", "2425-26-00");
          formData.append("datos[expositor]", "No");
          formData.append("datos[articulo]", "Inactivo");
          formData.append("datos[status]", "Activo");
          formData.append("datos[users_usuarios_usuario_nombre]", "Abel");
          formData.append("datos[users_usuarios_usuario_apaterno]", "Castro");
          formData.append("datos[users_usuarios_usuario_amaterno]", "Castro");
          formData.append("datos[users_usuarios_usuario_alias]", "Prueba");
          formData.append("datos[users_usuarios_rfc_usuario]", "CACX610315BD1");
          formData.append(
            "datos[users_usuarios_usuario_fecha_contrasena]",
            "2023-12-10 11:51:16"
          );
          formData.append("datos[usuario_status_acceso]", "Activo");
          */
          formData.append(
            "datos[cuentas_usuarios_id]",
            dataCuenta.value.cuentas_usuarios_id.toString()
          );
          formData.append(
            "datos[users_usuarios_usuario_id]",
            dataCuenta.value.users_usuarios_usuario_id.toString()
          );
          formData.append(
            "datos[users_usuarios_usuario_email]",
            dataCuenta.value.cuenta_email
          );
          formData.append(
            "datos[enviado]",
            dataCuenta.value.enviado == true ? "Si" : "No"
          );

          if (dataCuenta.value.password != "") {
            formData.append("datos[password]", dataCuenta.value.password);
          }

          console.log(formData);
          await cuentaStore.actualizarCuenta(formData);

          await showAlert(
            "Actualización de datos",
            cuentaStore.responseMessage
          );

          if (cuentaStore.type == "success") {
            await formEl.value?.reset();
            router.push({ name: "dashboard" });
          }
        } else {
          await showAlert("Actualización de datos", "Revise los datos");
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }

    onIonViewDidEnter(async () => {
      await cargarContacto();
    });

    return {
      colores,
      formEl,
      show,
      rules,
      dataCuenta,
      isValid,
      show1,
      actualizarRegistro,
    };
  },
});
</script>
