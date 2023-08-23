<script setup>
    import { formatCurrency, displayDate } from '../helpers/index.js';

  defineProps({
        cita: {
            type: Object
        }
    });

</script>

<template>
          <div 
              class="bg-white p-5 space-y-3 rounded-lg"
          >
                <div class="flex justify-around">
                    <p class="text-black font-black">
                        Fecha: <span class=" text-blue-600"> {{ displayDate( cita.date ) }} </span>
                    </p>
                    <p class="text-black font-black">
                        Hora: <span class="text-blue-600"> {{ cita.time }} Horas.</span>
                    </p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-black font-black">
                        Nombre Cliente: <span class="text-blue-600"> {{ cita.user.name }} </span>
                    </p>
                    <p class="text-black font-black">
                        Email: <span class="text-blue-600"> {{ cita.user.email }} </span>
                    </p>
                </div>

                <p class="text-lg font-black">Servicios Solicitados en la cita</p>
                <div v-for="service in cita.services">
                    <p>{{ service.name }}</p>
                    <p class="text-2xl font-black text-blue-500">{{ formatCurrency( service.price ) }}</p>
                </div>

                <p class="text-2xl font-black text-right">
                    Total a pagar: <span class="text-blue-600"> {{ formatCurrency( cita.totalPay ) }} </span>
                </p>
            </div>
</template>