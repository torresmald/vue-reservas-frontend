<script setup>
import { inject } from "vue";
import { saveJWT } from "../../helpers/index.js";
import { loginUser } from "../../api/AuthApi";
import { useRouter } from "vue-router";
import { reset } from "@formkit/vue";

const router = useRouter();

const handleIconClick = (node) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
const toast = inject("toast");

const handleSumit = async (formData) => {
  try {
    const { data } = await loginUser(formData);
    saveJWT(data.token);
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("loginForm");
    setTimeout(() => {
      router.push({ name: "mis-citas" });
    }, 3000);
  } catch (error) {
    console.log(error);
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Iniciar Sesión
  </h1>
  <FormKit
    type="form"
    :actions="false"
    incomplete-message="Revisa los Errores"
    @submit="handleSumit"
    id="loginForm"
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
    <FormKit
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Introduce tu Contraseña"
      validation="required|length:8"
      :validation-messages="{
        required: 'El Password es Obligatorio',
        length: 'El Password debe contener 8 caracteres',
      }"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    />
    <FormKit type="submit">Login</FormKit>
  </FormKit>
</template>
