<script setup>
import { useUsersStore } from "../../stores/useUsersStore.js";
import AdminCitas from "../../components/AdminCitas.vue";

const user = useUsersStore();
</script>

<template>
  <p class="text-white text-lg mt-5">Administra tus Proximas Citas</p>
  <div>
    <p v-if="user.noCitas" class="text-center text-white text-2xl">
      No tienes Proximas Citas
    </p>

    <div class="grid grid-cols-1 gap-5 mt-10" v-else>
      <AdminCitas v-for="cita in user.citas" :cita="cita" />
    </div>
  </div>
</template>
