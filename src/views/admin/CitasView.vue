<script setup>
import { onBeforeMount } from "vue";
import { useUsersStore } from "../../stores/useUsersStore.js";
import AdminCitas from "../../components/AdminCitas.vue";

const user = useUsersStore();



</script>

<template>
  <p class="text-white text-lg mt-5">Administra tus Proximas Citas</p>

  <p v-if="user.noCitas" class="text-white text-2xl text-center mt-5">
    No tienes próximas citas
  </p>

  <div v-else class="grid grid-cols-1 gap-5 mt-10">
    <AdminCitas v-for="cita in user.citas" :key="cita._id" :cita="cita" />
  </div>
</template>
