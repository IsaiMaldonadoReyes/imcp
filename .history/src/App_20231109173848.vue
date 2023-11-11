<template>
  <ion-app>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>

          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Title</v-app-bar-title>

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
          :rail="rail"
          permanent
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
        <v-main>
          <v-container fluid>
            <v-row dense>
              <v-col v-for="n in 4" :key="n" cols="12">
                <v-card
                  :title="`Content ${n}`"
                  :subtitle="`Subtitle for Content ${n}`"
                  text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
                ></v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
      <ion-router-outlet />
    </v-card>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const drawer = ref(true);
    const rail = ref(true);
    return { drawer, rail };
  },
});
</script>
