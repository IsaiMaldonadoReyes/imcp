<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div class="icon-box">
      <lottie-animation
        ref="anim"
        :animationData="IncorrectAnimation"
        :loop="false"
        :autoPlay="true"
        :speed="0.5"
        class="lottie-container"
      />
    </div>
    <v-card class="pa-6">
      <v-card-text
        class="text-h6 text-grey-darken-3 pt-15 text-center"
        :color="colores.rojoIMPC"
      >
        <span>{{ dialogPropiedades.mensajeTitulo }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1">
          {{ dialogPropiedades.mensajeCuerpo }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="dialogPropiedades.color"
          block
          size="large"
          variant="flat"
          @click="cerrardialogPropiedades(dialogPropiedades.ruta)"
        >
          {{ dialogPropiedades.boton }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { LottieAnimation } from "lottie-web-vue";
import CorrectAnimation from "../../assets/images/correct.json";
import IncorrectAnimation from "../../assets/images/incorrect.json";

export default defineComponent({
  name: "DialogAction",
  components: {
    LottieAnimation,
  },
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogContent: String,
    dialogRoute: String,
    dialogColour: String,
    dialogTextButton: String,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
    });

    function cerrardialogPropiedades(rutaDestino: any) {
      dialogPropiedades.value.dialog = false;

      if (rutaDestino != "") {
        router.push({ name: rutaDestino });
      }
    }

    return {
      dialogPropiedades,
      CorrectAnimation,
      IncorrectAnimation,
      cerrardialogPropiedades,
    };
  },
});
</script>
