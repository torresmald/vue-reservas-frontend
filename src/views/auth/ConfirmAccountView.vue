<script setup>
import { inject } from "vue";
import { confirmUser } from "../../api/AuthApi.js";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
const { token } = route.params;

const toast = inject("toast");
onMounted(async () => {
  try {
    const { data } = await confirmUser(token);
    toast.open({
      message: data.msg,
      type: "success",
    });
    setTimeout(() => {      
      router.push('/login')
    }, 3000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Verificar Cuenta
  </h1>
</template>
