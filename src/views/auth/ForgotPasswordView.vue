<script setup>
import {forgotPasswordUser} from '../../api/AuthApi.js'
import { inject } from 'vue';
import { reset } from "@formkit/vue";
import { useRouter } from "vue-router";

const toast = inject('toast')
const router = useRouter();


const handleSumit = async ({email}) => {
  try {
    const {data} = await forgotPasswordUser({email})
    toast.open({
      message: data.msg,
      type: 'success'
    }) 
    reset("forgotForm");
    setTimeout(() => {
      router.push({ name: "login" });
    }, 3000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    }) 
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center m-10">
    Recupera tu Password
  </h1>
  <FormKit
    type="form"
    :actions="false"
    incomplete-message="Revisa los Errores"
    @submit="handleSumit"
    id="forgotForm"
  >
    <FormKit
      type="text"
      label="Email"
      name="email"
      placeholder="Introduce tu Email"
      validation="required|email"
      :validation-messages="{
        required: 'El Email es Obligatorio',
        email: 'El Email no es válido',
      }"
    />
    <FormKit type="submit">Enviar</FormKit>
  </FormKit>
</template>

