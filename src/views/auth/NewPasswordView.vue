<script setup>
import { onMounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { verifiyPasswordResetToken, updatePassword } from "../../api/AuthApi";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();

const validToken = ref(false);
onMounted(async () => {
  const { token } = route.params;
  try {
    const { data } = await verifiyPasswordResetToken(token);
    toast.open({
      message: data.msg,
      type: "success",
    });
    validToken.value = true;
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});

const handleIconClick = (node) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const handleSumit = async ({password}) => {
  try {
    const {data} = await updatePassword(token, password)
    console.log(data);
    toast.open({
      message: data.msg,
      type: "success",
    });
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
  <h1 class="text-6xl font-extrabold text-white text-center m-10">
    Nuevo Password
  </h1>
  <div v-if="validToken">
    <FormKit
      type="form"
      :actions="false"
      incomplete-message="Revisa los Errores"
      @submit="handleSumit"
      id="forgotForm"
    >
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

      <FormKit type="submit">Enviar</FormKit>
    </FormKit>
  </div>
</template>
