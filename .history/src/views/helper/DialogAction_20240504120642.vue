<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div class="icon-box">
      <lottie-animation
        ref="anim"
        animationData="require('../../assets/images/correct.json')"
        :loop="false"
        :autoPlay="true"
        :speed="dialogPropiedades.velocidad"
        class="lottie-container"
        renderer="svg"
      />
    </div>
    <v-card class="pa-6">
      <v-card-text
        class="text-h6 text-grey-darken-3 pt-15 text-center"
        :color="dialogPropiedades.color"
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
          @click="cerrarDialogPropiedades"
        >
          {{ dialogPropiedades.boton }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import CorrectAnimation from "../../assets/images/correct.json";
import { create } from "ionicons/icons";
//import IncorrectAnimation from "../../assets/images/incorrect.json";

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
    dialogSpeed: Number,
  },
  setup(props, { emit }) {
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
      velocidad: ref(props.dialogSpeed),
    });

    const cerrarDialogPropiedades = () => {
      emit("cerrarDialog");
    };

    let var1 = ref({});
    const animation = ref<any>(null);
    const input = ref(null);

    onMounted(async () => {
      /*const response = await fetch("../../assets/images/incorrect.json");
      const file = await response.json();
      console.log("cool file", file);*/
      console.log("../../assets/images/" + props.dialogRoute + ".json");

      /*await import("../../assets/images/" + props.dialogRoute + ".json").then(
        (module) => {
          var1.value = module.default; // modify var1 by assigning to var1.value
        }
      );

      LottieAnimation.loadAnimation({
        container: animation,
        animationData: JSON.parse(JSON.stringify(var1.value)),
        loop: "false",
        autoPlay: "true",
        speed: "dialogPropiedades.velocidad",
        class: "lottie-container",
      });*/
    });

    watch(
      () => props.dialogView,
      (newValue) => {
        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        };
      }
    );

    return {
      var1,
      dialogPropiedades,
      CorrectAnimation,
      cerrarDialogPropiedades,
      animation,
    };
  },
});
</script>
<style>
.lottie-container {
  height: 100px;
}

.icon-box {
  color: #fff;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  z-index: 2401;
  background: #fff;
  padding: 10px;
  text-align: center;
}
</style>
