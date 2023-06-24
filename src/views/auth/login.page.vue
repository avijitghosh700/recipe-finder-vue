<style scoped lang="scss">
@import "src/styles/_var.scss";

.login {
  height: 100vh;

  &__form {
    max-width: 400px;
    width: 100%;
  }
}
</style>

<template>
  <main class="main login">
    <section class="login__section grid place-items-center h-full px-3">
      <form class="login__form credential p-5 rounded border" @submit.prevent="logIn">
        <div class="login__formHeader text-center mb-5">
          <Logo size="xl" :symbolOnly="true" />
          <h2 class="text-center text-3xl text-theme-primary">Signin</h2>
        </div>

        <div class="form-group mb-3">
          <label for="email" class="credential__label mb-1">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            class="credential__input"
            :class="{ invalid: v$.email.$error }"
            id="email"
            v-model="v$.email.$model"
          />

          <ErrorMessage :errors="v$.email.$errors" />
        </div>

        <div class="form-group mb-6">
          <label for="password" class="credential__label mb-1">Password</label>

          <div class="credential__passwordWithToggler">
            <input
              :type="!passwordViewToggle ? 'password' : 'text'"
              placeholder="Example@123"
              class="credential__input"
              :class="{ invalid: v$.password.$error }"
              id="password"
              v-model="v$.password.$model"
            />

            <button type="button" class="passwordToggleBtn" @click="togglePasswordVisibility()">
              <vue-feather
                :type="passwordViewToggle ? 'eye-off' : 'eye'"
                :class="{ 'text-red-600': v$.password.$error }"
                class="h-[16px] w-[16px]"
              ></vue-feather>
            </button>
          </div>

          <ErrorMessage :errors="v$.password.$errors" />
        </div>

        <div class="login__formBtnGrp flex flex-wrap md:flex-nowrap md:justify-between gap-3">
          <button
            type="button"
            class="btn btn__primary outlined large rounded px-4 w-full order-1 md:w-auto md:order-0"
            @click="goToSignup()"
          >
            Create an account
          </button>
          <button
            type="submit"
            class="btn btn__primary large rounded px-4 w-full order-0 md:w-auto md:order-1"
          >
            <template v-if="!loading">Sign In</template>
            <vue-feather v-if="loading" type="loader" animation="spin"></vue-feather>
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

import { toast } from "vue3-toastify";

import { signIn } from "@/shared/services/authService";

const router = useRouter();

const passwordViewToggle = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const signInForm = reactive({
  email: "",
  password: "",
});

const rules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Not a valid email address", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: minLength(6),
  },
};

const v$ = useVuelidate(rules, signInForm);

const goToSignup = () => router.push("/register");

const togglePasswordVisibility = (): boolean =>
  (passwordViewToggle.value = !passwordViewToggle.value);

const logIn = async () => {
  const isInvalid = v$.value.$invalid;

  if (isInvalid) return;

  loading.value = true;

  try {
    const response = await signIn(signInForm.email, signInForm.password);
    const user = response.user;
    console.log(user);

    loading.value = false;
    
    router.push("/dashboard");
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMsg.value = "Invalid email";
        break;
      case "auth/user-not-found":
        errorMsg.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errorMsg.value = "Incorrect password";
        break;
      default:
        errorMsg.value = "Email or password was incorrect";
        break;
    }

    toast(errorMsg.value, { type: "error" });

    loading.value = false;
  }
};
</script>
