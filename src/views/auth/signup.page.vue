<style scoped lang="scss">
@import "src/styles/_var.scss";

.signup {
  height: 100vh;

  &__form {
    max-width: 400px;
    width: 100%;
  }
}
</style>

<template>
  <main class="main signup">
    <section class="signup__section grid place-items-center h-full px-3">
      <form
        class="signup__form credential p-5 rounded border"
        @submit.prevent="registerWithEmail"
      >
        <div class="signup__formMain">
          <div class="signup__formHeader text-center mb-5">
            <Logo size="xl" :symbolOnly="true" />
            <h2 class="text-center text-3xl text-theme-primary">Signup</h2>
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

          <div class="form-group mb-3">
            <label for="password" class="credential__label mb-1"
              >Password</label
            >

            <div class="credential__passwordWithToggler">
              <input
                :type="!passwordViewToggle.password ? 'password' : 'text'"
                placeholder="Example@123"
                class="credential__input"
                :class="{ invalid: v$.password.$error }"
                id="password"
                v-model="v$.password.$model"
              />

              <button
                type="button"
                class="passwordToggleBtn"
                @click="togglePasswordVisibility()"
              >
                <vue-feather
                  :type="passwordViewToggle.password ? 'eye-off' : 'eye'"
                  :class="{ 'text-red-600': v$.password.$error }"
                  class="h-[16px] w-[16px]"
                ></vue-feather>
              </button>
            </div>

            <ErrorMessage :errors="v$.password.$errors" />
          </div>

          <div class="form-group mb-6">
            <label for="confirmPassword" class="credential__label mb-1"
              >Confirm password</label
            >

            <div class="credential__passwordWithToggler">
              <input
                :type="
                  !passwordViewToggle.confirmPassword ? 'password' : 'text'
                "
                class="credential__input"
                :class="{ invalid: v$.confirmPassword.$error }"
                id="confirmPassword"
                v-model="v$.confirmPassword.$model"
              />

              <button
                type="button"
                class="passwordToggleBtn"
                @click="toggleConfirmPasswordVisibility()"
              >
                <vue-feather
                  :type="passwordViewToggle.confirmPassword ? 'eye-off' : 'eye'"
                  :class="{ 'text-red-600': v$.confirmPassword.$error }"
                  class="h-[16px] w-[16px]"
                ></vue-feather>
              </button>
            </div>

            <ErrorMessage :errors="v$.confirmPassword.$errors" />
          </div>

          <div
            class="signup__formBtnGrp flex flex-wrap md:flex-nowrap md:justify-between gap-3"
          >
            <button
              type="button"
              class="btn btn__primary-light large rounded px-4 w-full order-1 md:w-auto md:order-0"
              @click="goToSignin()"
            >
              Already have an account?
            </button>
            <button
              type="submit"
              class="btn btn__primary large rounded px-4 w-full order-0 md:w-auto md:order-1"
              :disabled="loading || loadingOAuth"
            >
              <template v-if="!loading">Sign Up</template>
              <vue-feather
                v-if="loading"
                type="loader"
                animation="spin"
                animation-speed="fast"
              ></vue-feather>
            </button>
          </div>
        </div>

        <hr class="my-4" />

        <div class="signup__formOAuth">
          <button
            class="btn btn__primary outlined large rounded px-4 w-full"
            :disabled="loading || loadingOAuth"
            @click="loginWithGoogle"
          >
            <template v-if="!loadingOAuth"> Sign in with Google </template>
            <vue-feather
              v-if="loadingOAuth"
              type="loader"
              animation="spin"
              animation-speed="fast"
            ></vue-feather>
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from "@vuelidate/validators";

import { toast } from "vue3-toastify";

import { signInWithGoogle, signUp } from "@/shared/services/authService";

import { errorFormatter } from "@/shared/utils";

import firebaseApp from "@/shared/firebase.config";

const router = useRouter();

const auth = getAuth(firebaseApp);

const loading = ref(false);
const loadingOAuth = ref(false);
const errorMsg = ref("");

const passwordViewToggle = reactive({
  password: false,
  confirmPassword: false,
});
const signUpForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordRef = computed(() => signUpForm.password);

const rules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Not a valid email address", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password should be at least 6 characters long",
      minLength(6)
    ),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm password is required", required),
    sameAsPassword: helpers.withMessage(
      "Both fields must be equal",
      sameAs(passwordRef)
    ),
  },
};

const v$ = useVuelidate(rules, signUpForm);

const goToSignin = () => router.push("/");

const togglePasswordVisibility = (): boolean =>
  (passwordViewToggle.password = !passwordViewToggle.password);

const toggleConfirmPasswordVisibility = (): boolean =>
  (passwordViewToggle.confirmPassword = !passwordViewToggle.confirmPassword);

const registerWithEmail = async () => {
  const isInvalid = v$.value.$invalid;

  if (isInvalid) return;

  loading.value = true;

  try {
    const response = await signUp(signUpForm.email, signUpForm.password);
    const user = response.user;

    loading.value = false;

    user && router.push("/dashboard");
  } catch (error: any) {
    errorMsg.value = errorFormatter(error.code);

    toast(errorMsg.value, { type: "error" });

    loading.value = false;
  }
};

const loginWithGoogle = async () => {
  loadingOAuth.value = true;

  try {
    const response = await signInWithGoogle();
    const user = response.user;

    loadingOAuth.value = false;

    user && router.push("/dashboard");
  } catch (error: any) {
    errorMsg.value = errorFormatter(error.code);

    toast(errorMsg.value, { type: "error" });

    loadingOAuth.value = false;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) router.replace("/dashboard");
});
</script>
