<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import { registerUser } from "../../api/AuthApi.js";
import { useRouter } from "vue-router";


const router = useRouter()

const toast = inject("toast");

const handleIconClick = (node) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const handleSumit = async (data) => {
  const { password_confirm, ...formData } = data;
  try {
    const { data } = await registerUser(formData);
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("registerForm");
    setTimeout(() => {
      router.push({name: 'login'})
    }, 3000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Crea una Cuenta
  </h1>
  <FormKit
    type="form"
    :actions="false"
    incomplete-message="Revisa los Errores"
    @submit="handleSumit"
    id="registerForm"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Introduce tu Nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El Nombre es Obligatorio',
        length: 'El Nombre es muy corto',
      }"
    />
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
    <FormKit
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Elige una Contraseña"
      validation="required|length:8"
      :validation-messages="{
        required: 'El Password es Obligatorio',
        length: 'El Password debe contener 8 caracteres',
      }"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    />
    <FormKit
      type="password"
      label="Repetir Contraseña"
      name="password_confirm"
      placeholder="Repite tu Contraseña"
      validation="confirm"
      validation-visibility="live"
      :validation-messages="{
        confirm: 'Las Contraseñas no coinciden',
      }"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    />
    <FormKit type="submit">Crear Cuenta</FormKit>
  </FormKit>
</template>
<style scoped></style>
