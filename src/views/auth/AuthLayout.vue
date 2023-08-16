<script setup>
import { RouterView } from "vue-router";
const authRoutes = [
  { name: "register", text: "Registro" },
  { name: "login", text: "Login" },
];
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="route in authRoutes"
        class="uppercase font-bold text-white"
        :to="{ name: route.name }"
        >{{ route.text }}
      </RouterLink>
    </nav>
  </div>
</template>
