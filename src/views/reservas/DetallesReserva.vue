<script setup>
import CitasItem from "../../components/CitasItem.vue";
import { useCitasStore } from "../../stores/useCitasStore";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { formatCurrency } from "../../helpers";
import { ref } from "vue";
const citas = useCitasStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMM",
});

const disableDate = (date) => {
  const today = new Date();
  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    date.getDay() === 0 ||
    date.getDay() === 6
  );
};
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
  <p class="text-white text-lg">Verifica y Confirma tu Cita</p>
  <div class="flex justify-between">
    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
    <div class="flex flex-col items-end" v-if="!citas.noServicesSelected">
      <p class="text-2xl text-white font-extrabold">
        Elmina todos los Servicios
      </p>
      <button class="mr-4" @click="citas.deleteAllServices">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 text-red-600 font-bold"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="grid gap-5">
    <CitasItem v-for="cita in citas.citas" :cita="cita" />
  </div>
  <p v-if="citas.noServicesSelected" class="text-white text-2xl text-center">
    No Hay ningún Servicio Seleccionado
  </p>
  <p
    class="text-3xl font-extrabold text-white text-right"
    v-if="!citas.noServicesSelected"
  >
    Total a Pagar:
    <span class="font-black">{{ formatCurrency(citas.totalPay()) }}</span>
  </p>
  <div class="space-y-6" v-if="!citas.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
    <p class="text-white text-xs">Sábados y Domingos Cerrado por Descanso</p>
    <div class="lg:flex gap-5 items-center">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatepicker
          i18n="es-es"
          as-single
          no-input
          :formatter="formatter"
          v-model="citas.date"
          :disable-date="disableDate"
        />
      </div>
      <div
        class="flex-1 grid grid-cols-2 gap-5 mt-10 lg:mt-0"
        v-if="citas.isDateSelected"
      >
        <button
          v-for="hour in citas.hours"
          class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-30"
          @click="citas.time = hour"
          :class="citas.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
          :disabled="citas.disableTime(hour) ? true : false"
        >
          <template v-if="!citas.disableTime(hour)">
            {{ hour }}
          </template>
          <template v-else> No Disponible </template>
        </button>
      </div>
    </div>
    <div class="flex justify-center" v-if="citas.isValidReservation">
      <button
        class="w-full md:w-auto lg:w-96 bg-blue-500 p-3 rounded-lg font-black text-white hover:bg-blue-800"
        @click="citas.createCita"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>
