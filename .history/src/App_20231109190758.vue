<template>
  <ion-app>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="#E9EDEE">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>
            <v-img
              class="logo"
              max-height="90px"
              max-width="300px"
              src="assets/images/logotipo.svg"
            />
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          temporary
          :rail="rail"
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-home-city"
              title="Home"
              value="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main> </v-main>
        <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
          <v-btn>
            <v-icon>mdi-view-dashboard</v-icon>
            <span>Dashboard</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-certificate</v-icon>
            <span>Certificado</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-book</v-icon>

            <span>Book</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi-image</v-icon>

            <span>Image</span>
          </v-btn>
        </v-bottom-navigation>
      </v-layout>
    </v-card>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const drawer = ref(false);
    const rail = ref(false);
    const value = ref(1);

    const color = computed(() => {
      switch (value.value) {
        case 0:
          return "#B20000";
        case 1:
          return "#A9A9A9";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    });
    return { drawer, rail, value, color };
  },
});
</script>
