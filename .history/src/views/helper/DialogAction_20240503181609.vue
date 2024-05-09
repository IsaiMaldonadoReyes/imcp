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
      <!--lottie-animation
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
          /-->
      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1">
          {{ dialogPropiedades.mensajeCuerpo }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="colores.rojoIMPC"
          block
          size="large"
          variant="flat"
          @click="cerrardialogPropiedades(dialogPropiedades.correcto)"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import CorrectAnimation from "../assets/images/correct.json";
import IncorrectAnimation from "../assets/images/incorrect.json";

export default defineComponent({
  name: "DialogAction",
  components: {
    LottieAnimation,
  },
  setup() {
    const dialogPropiedades = ref({
      dialog: false,
      mensajeTitulo: "",
      mensajeCuerpo: "",
      correcto: false,
    });

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        router.push({ name: "dashboard" });
      }
    }

    return {
      colores,
      dialogPropiedades,
      CorrectAnimation,
      IncorrectAnimation,
      cerrardialogPropiedades,
    };
  },
});
</script>
