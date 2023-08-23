<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { getCitaById } from "../../api/CitasApi.js";
import {useCitasStore} from '../../stores/useCitasStore.js'
const route = useRoute();
const router = useRouter();

const citas = useCitasStore()
const { id } = route.params;
onMounted(async () => {
  try {
    const {data} = await getCitaById(id)
    citas.setSelectedCita(data)
  } catch (error) {
    router.push({name: 'mis-citas'})
  }
});
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'editar-cita' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-800 hover:text-white"
      :class="
        route.name === 'editar-cita'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-500'
      "
    >
      Servicios
    </RouterLink>
    <RouterLink
      :to="{ name: 'editar-detalles-cita' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-800 hover:text-white"
      :class="
        route.name === 'editar-detalles-cita'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-500'
      "
    >
      Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
